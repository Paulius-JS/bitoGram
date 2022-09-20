import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import MainContext from "../context/MainContext";

const Logout = () => {
  const { setLoggedIn, setUserInfo } = useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/api/logout").then((resp) => {
      setLoggedIn(false);
      setUserInfo({});
      navigate("/");
    });
  }, [navigate, setLoggedIn, setUserInfo]);

  return <div></div>;
};

export default Logout;
