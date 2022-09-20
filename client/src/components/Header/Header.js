import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import MainContext from "../../context/MainContext";
import logo from "./Logo.svg";
import "./Header.css";

const Header = () => {
  const { loggedIn, userInfo } = useContext(MainContext);

  return (
    <header className="p-3 text-bg-dark">
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
            <li>
              <Link to="/explore" className="nav-link px-2 nav-link-active">
                Explore
              </Link>
            </li>
          </ul>

          <div className="text-end">
            {loggedIn ? (
              <>
                <Link
                  to={"/profile/" + userInfo.id}
                  className="userImageHeader"
                >
                  <img src={userInfo.image} alt="" />

                  {userInfo.user_name}
                </Link>
                <Link to={"/user-panel"} className="btn btn-warning">
                  User Panel
                </Link>
                <Link to="/logout" className="btn btn-warning">
                  logOut
                </Link>
              </>
            ) : (
              <>
                <p>Why are you here without loging in???</p>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
