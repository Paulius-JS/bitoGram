import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import MainContext from "../../context/MainContext";
import logo from "../../resources/BitoGramLogo.png";
import axios from "axios";
import "./Header.css";

import { NewCommentM } from "../../pages/modals/NewCommentM";

const Header = () => {
  const { loggedIn, userInfo } = useContext(MainContext);

  const [showResults, setShowResults] = useState(false);
  const [users, setUsers] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();

    if (e.target.value === "") return setShowResults(false);

    axios
      .get("/api/search/" + e.target.value)
      .then((resp) => {
        setUsers(resp.data);
        setShowResults(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <div className="leftHeader">
        <Link to="/explore">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="mainMenu">
        <div className="newPost">
          <button className="button-53" onClick={() => setOpenModal(true)}>
            New Post
          </button>
          <NewCommentM open={openModal} onClose={() => setOpenModal(false)} />
        </div>

        <div className="searchBar">
          <div className="form-group d-flex">
            <input
              type="text"
              className="form-control"
              placeholder="Search for user..."
              onChange={(e) => handleSearch(e)}
              onBlur={(e) => {
                if (e.target.value === "") setShowResults(false);
              }}
            />
          </div>
          {showResults && (
            <div className="searchDropDown">
              <ul>
                {users.map((user) => (
                  <li key={user.id}>
                    <Link to={"/profile/" + user.id}>
                      <div className="searchBarImg">
                        <img src={user.image} alt="" />
                      </div>
                      {user.user_name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <ul>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/fortest">For You</Link>
          </li>
        </ul>
      </div>
      <div className="rightHeader">
        {loggedIn ? (
          <>
            <div className="dropdown">
              <div className="dropbtn">
                <img src={userInfo.image} alt="" />
                {userInfo.user_name}
              </div>
              <div className="dropdown-content">
                <Link to={"/user-panel"}>User Panel</Link>
                <Link to="/logout">log out</Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>Are you sure u are logged?</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
