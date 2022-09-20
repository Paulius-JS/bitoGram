import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import MainContext from "../context/MainContext";
import "./Profile.css";

const Profile = () => {
  const { id } = useParams();
  const { setLoggedIn, setUserInfo } = useContext(MainContext);

  const [Profile, setProfile] = useState({});

  useEffect(() => {
    axios.get(`/api/profile/${id}`).then((resp) => {
      setProfile(resp.data);

      console.log(resp.data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="singleUserName">{Profile.user_name}</div>
        <div className="userPosts">
          {Profile.posts &&
            Profile.posts.map((profile) => (
              <div className="singleUserPost" key={profile.id}>
                <img src={profile.image} alt="" />
                <span>{profile.text}</span>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
