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
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <img src={logo} alt="BitoGram" style={{ maxWidth: "40px" }} />
            <div className="d-block ms-3 lh-1">
              <h6 className="mb-0">
                Bito<span className="LogoOrange">Gram</span>{" "}
              </h6>
              <span className="text-uppercase fs-7 fw-semibold">
                Better than One.lt
              </span>
            </div>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 ms-5 justify-content-center mb-md-0">
            <li>
              <Link to="/" className="nav-link px-2 nav-link-active">
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
                <Link to="/login" className="btn btn-warning">
                  LogIn
                </Link>
                <Link to="/register" className="btn btn-warning">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
