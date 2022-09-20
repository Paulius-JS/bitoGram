import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

const UserPanel = () => {
  const [EditProfile, setEditProfile] = useState({});
  const { id } = useParams();

  const { userInfo, setUserInfo } = useContext(MainContext);

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

    axios.put("/api/user-panel/", formData, userInfo).then((resp) => {});
  };

  return (
    <div className="container">
      <h1>EDITOR</h1>
      <form className="form-group " onSubmit={(e) => handleSubmit(e)}>
        <input
          type="file"
          className="form-control mb-2 mr-sm-2"
          name="image"
          onChange={handleForm}
        />

        <hr />
        <button className="btn btn btn-dark mb-2">Make New Post</button>
      </form>
    </div>
  );
};

export default UserPanel;
