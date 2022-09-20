import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Explore from "./pages/Explore";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";
import UserPanel from "./pages/UserPanel";

import Header from "./components/Header/Header";
import Alert from "./components/Alert/Alert";
import MainContext from "./context/MainContext";
import "./App.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const contextValues = { loggedIn, setLoggedIn, userInfo, setUserInfo };

  useEffect(() => {
    axios.get("/api/check-auth/").then((resp) => {
      setLoggedIn(true);
      setUserInfo(resp.data);
    });
  }, []);

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {loggedIn && (
            <>
              <Route path="/logout" element={<Logout />} />
              <Route path="/" element={<Explore />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/user-panel" element={<UserPanel />} />
            </>
          )}
        </Routes>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
