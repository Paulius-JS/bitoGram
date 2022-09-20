import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import MainContext from "../context/MainContext";

// Css and Images
import "./FirstPage.css";
import Logo from "../resources/BitoGramLogo.png";

import { RegisterModal } from "./modals/RegisterModal";

function FirstPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState("");
  const { setLoggedIn, setUserInfo } = useContext(MainContext);

  const [openModal, setOpenModal] = useState(false);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/login", form).then((resp) => {
      setLoggedIn(true);
      setUserInfo(resp.data.user);
      navigate("/explore");
    });
  };
  return (
    <div className="container">
      <div className="logoSpot">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="mainLoginWindow">
        <div className="loginWindow">
          <div className="loginText">
            <h2>Sign in</h2>
          </div>
          <form className="form-group " onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              name="email"
              onChange={handleForm}
              placeholder="Email"
            />
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              name="password"
              onChange={handleForm}
              placeholder="Password"
            />
            <hr />
            <button>Log In</button>
          </form>
        </div>
        <div className="mainNotRegister">
          <p>Dont have account?</p>
          <button onClick={() => setOpenModal(true)}>Register</button>
          <RegisterModal open={openModal} onClose={() => setOpenModal(false)} />
          <div className="registerButton"></div>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
