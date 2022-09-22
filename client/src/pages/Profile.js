import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import MainContext from "../context/MainContext";

import "./Profile.css";

const Profile = () => {
  const { id } = useParams();

  const [Profile, setProfile] = useState({});

  const { setAlert } = useContext(MainContext);
  const [refresh, setRefresh] = useState(false);
  const [Posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`/api/profile/${id}`).then((resp) => {
      console.log("profile", resp.data);
      setProfile(resp.data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <div className="userWindow">
          <div className="userImage">
            <img src={Profile.image} alt="user" />
          </div>
          <div className="userInfo">
            <h1>{Profile.user_name}</h1>
            <p>{Profile.bio}</p>
          </div>
        </div>
        <div className="profilePosts">
          {Profile.posts &&
            Profile.posts.map((post) => (
              <div key={post.id} className="profilePostCard">
                <img src={post.image} alt="" />
                <p className="profilePostCardComments">
                  Love: <b>{post.likes.length}</b> Comments:
                  <b>{" " + post.comments.length}</b>
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Profile;
