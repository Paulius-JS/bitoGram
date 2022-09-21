import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Not Logged In
import FirstPage from "./pages/FirstPage";

//Logged In
import Explore from "./pages/Explore";
import Profile from "./pages/Profile";
import UserPanel from "./pages/UserPanel";
import Logout from "./pages/Logout";

//Components
import Header from "./components/Header/Header";

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
        {loggedIn && <Header />}

        <Routes>
          <Route path="/" element={<FirstPage />} />
          {loggedIn && (
            <>
              <Route path="/logout" element={<Logout />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/user-panel" element={<UserPanel />} />
            </>
          )}
          <Route path="*" element={<FirstPage />} />
        </Routes>
      </MainContext.Provider>
    </BrowserRouter>
  );
};

export default App;
