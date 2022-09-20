import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

import { NewCommentM } from "./modals/NewCommentM";

import "./Explore.css";

const Explore = () => {
  const { setAlert } = useContext(MainContext);

  const [openModal, setOpenModal] = useState(false);

  const [Posts, setPosts] = useState([]);
  const [form, setForm] = useState("");

  const [refresh, setRefresh] = useState(false);

  const navigate = useNavigate();

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e, postId) => {
    e.preventDefault();
    form.postId = postId;

    axios.post("/api/comments/new", form).then((resp) => {
      setRefresh(!refresh);

      navigate("/");
    });
  };

  useEffect(() => {
    axios
      .get("/api/posts/")
      .then((resp) => {
        setPosts(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        setAlert({
          message: error.response.data,
          status: "danger",
        });
      });
  }, [setAlert, refresh]);

  return (
    <div className="container">
      <div className="explorer">
        <div className="newPostDiv">
          <button onClick={() => setOpenModal(true)}>Make a Post</button>
          <NewCommentM open={openModal} onClose={() => setOpenModal(false)} />
        </div>
        {Posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="userInfo">
              <img src={post.user.image} alt="" />
              <span className="userName">
                <Link to={`/profile/${post.userId}`}>
                  {post.user.user_name}
                </Link>
              </span>
            </div>
            <div className="postContent">
              <img src={post.image} alt="post" />
              <span className="userPost">{post.text}</span>
            </div>
            <hr />
            <div className="comments">
              {post.comments &&
                post.comments.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <div className="userInfoComment">
                      <img
                        src="https://media.istockphoto.com/vectors/vector-businessman-black-silhouette-isolated-vector-id610003972?k=20&m=610003972&s=612x612&w=0&h=-Nftbu4sDVavoJTq5REPpPpV-kXH9hXXE3xg_D3ViKE="
                        alt=""
                      />
                      <span className="userName">{comment.user.user_name}</span>
                    </div>
                    <div className="commentContent">
                      <span className="userComment">{comment.text}</span>
                    </div>
                  </div>
                ))}
              <form
                className="form-inline d-flex"
                onSubmit={(e) => handleSubmit(e, post.id)}
              >
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  name="text"
                  onChange={handleForm}
                  placeholder="leave comment....."
                />
                <button className="btn btn btn-dark mb-2">Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Explore;
