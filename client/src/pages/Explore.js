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
  const [users, setUsers] = useState([]);

  const [keyword, setKeyword] = useState("");

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setAlert, refresh]);

  const handleLike = (postId) => {
    axios
      .post("/api/likes/" + postId)
      .then((resp) => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword === "") return setRefresh(!refresh);

    axios
      .get("/api/search/" + keyword)
      .then((resp) => {
        setUsers(resp.data);
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="explorer">
        <div className="searchBar">
          <form onChange={handleSearch}>
            <div className="form-group d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Paieškos frazė"
                onChange={(e) => setKeyword(e.target.value)}
                onBlur={(e) => {
                  if (keyword === " ") setRefresh(!refresh);
                }}
              />
            </div>
          </form>
          <div className="searchDropDown">
            <ul>
              {users.map((user) => (
                <li key={user.id}>
                  <Link to={"/profile/" + user.id}>
                    <div className="searchBarImg">
                      <img src={user.image} alt="" />
                    </div>
                    {user.user_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
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
            <div className="postLikes">
              {post.likes.length} likes
              <button onClick={() => handleLike(post.id)}>Like</button>
            </div>
            <hr />
            <div className="comments">
              {post.comments &&
                post.comments.map((comment) => (
                  <div className="comment" key={comment.id}>
                    <div className="userInfoComment">
                      <img src={comment.user.image} alt="" />
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
