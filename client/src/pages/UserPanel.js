import { useEffect, useState, useContext } from "react";
import axios from "axios";

import MainContext from "../context/MainContext";

const UserPanel = () => {
  const [Profile, setProfile] = useState({});
  const [EditProfile, setEditProfile] = useState({});
  const { refresh, setRefresh } = useContext(MainContext);
  useEffect(() => {
    axios.get(`/api/user-panel`).then((resp) => {
      setProfile(resp.data);
      console.log(resp.data);
    });
  }, [refresh]);

  const handleForm = (e) => {
    setEditProfile({
      ...EditProfile,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in EditProfile) {
      formData.append(key, EditProfile[key]);
    }
    axios.put("/api/user-panel", formData).then((resp) => {
      setEditProfile(resp.data);
      setRefresh((prev) => !prev);
    });
  };

  return (
    <>
      <div className="container">
        <div className="userWindow">
          <div className="userImage">
            <img src={Profile.image} alt="user" />
          </div>
          <div className="userInfo">
            <h1>{Profile.user_name}</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
              <textarea
                name="bio"
                defaultValue={Profile.bio}
                cols="40"
                rows="10"
                onChange={(e) => handleForm(e)}
              />
              <input type="file" name="image" onChange={handleForm} />
              <button className="button-53">Update profile info</button>
            </form>
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

export default UserPanel;
