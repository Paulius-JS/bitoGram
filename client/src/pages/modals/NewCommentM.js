import { useState } from "react";
import axios from "axios";

import "./NewCommentM.css";

export const NewCommentM = ({ open, onClose }) => {
  const [NewPost, setNewPost] = useState({});

  const handleForm = (e) => {
    setNewPost({
      ...NewPost,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (const key in NewPost) {
      formData.append(key, NewPost[key]);
    }

    axios.post("/api/posts/new", formData).then((resp) => {
      onClose();
    });
  };
  if (!open) return null;
  return (
    <>
      <div className="modal-wrapper">
        <div className="modal">
          <div className="modal-header">
            <span className="newPostText">New Post</span>
            <span className="close-modal-btn" onClick={onClose}>
              X
            </span>
          </div>
          <div className="modalNewPost">
            <form className="form-group " onSubmit={(e) => handleSubmit(e)}>
              <input
                type="file"
                className="form-control mb-2 mr-sm-2"
                name="image"
                onChange={handleForm}
              />
              <textarea
                name="text"
                id=""
                cols="30"
                rows="10"
                onChange={handleForm}
                placeholder="leave comment....."
              ></textarea>
              <hr />
              <button className="btn btn btn-dark mb-2">Make New Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
