import { useState } from "react";
import axios from "axios";

import "./NewCommentM.css";

export const NewCommentM = ({ open, onClose }) => {
  const [NewPost, setNewPost] = useState({});
  const [prevImg, setPrevImg] = useState(null);

  const handleForm = (e) => {
    setNewPost({
      ...NewPost,
      [e.target.name]:
        e.target.name === "image" ? e.target.files[0] : e.target.value,
    });
    setPrevImg(URL.createObjectURL(e.target.files[0]));
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
          <span className="close-modal-btn" onClick={onClose}>
            X
          </span>

          <div className="newPostModal">
            <div className="newPostShowUploadedImg">
              {prevImg && <img src={prevImg} alt="uploaded" />}
            </div>

            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="file" name="image" onChange={handleForm} />
              <textarea
                name="text"
                id=""
                cols="30"
                rows="7"
                onChange={handleForm}
                placeholder="Describe your post"
              ></textarea>
              <hr />
              <button className="button-53">Make New Post</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
