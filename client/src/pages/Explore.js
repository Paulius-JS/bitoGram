import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

import "./Explore.css";
import Hearth1 from "../resources/hearth1.svg";
import Hearth2 from "../resources/hearth2.svg";

const Explore = () => {
  const { userInfo } = useContext(MainContext);

  const { setRefresh, refresh } = useContext(MainContext);

  const [Posts, setPosts] = useState([]);
  const [form, setForm] = useState("");

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
  }, [refresh]);

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

  return (
    <>
      <div className="explore">
        {Posts.map((post) => (
          <div key={post.id} className="instagram-card">
            <div className="instagram-card-header">
              <img
                src={post.user.image}
                alt={post.user.image}
                className="instagram-card-user-image"
              />

              <Link
                className="instagram-card-user-name"
                to={`/profile/${post.userId}`}
              >
                {post.user.user_name}
              </Link>
            </div>

            <div className="intagram-card-image">
              <img src={post.image} alt={post.image} />
            </div>

            <div className="instagram-card-content">
              <div className="likes">
                {post.likes.length} love this
                <button onClick={() => handleLike(post.id)}>
                  {post.likes.find((like) => like.userId === userInfo.id) ? (
                    <img src={Hearth2} alt="Hearth2" />
                  ) : (
                    <img src={Hearth1} alt="Hearth1" />
                  )}
                </button>
              </div>
              <p>
                <Link
                  className="instagram-card-user-name"
                  to={`/profile/${post.userId}`}
                >
                  {post.user.user_name}
                </Link>{" "}
                {post.text}
              </p>
              <p className="comments">{post.comments.length} Comments.</p>

              {post.comments &&
                post.comments.map((comment) => (
                  <div key={comment.id} className="userCommentsDiv">
                    <Link
                      className="user-comment"
                      to={`/profile/${comment.user.id}`}
                    >
                      {comment.user.user_name}
                    </Link>

                    <p>{comment.text} </p>
                    <p></p>
                  </div>
                ))}
            </div>

            <div className="instagram-card-footer">
              <form
                className="comments-input"
                onSubmit={(e) => handleSubmit(e, post.id)}
              >
                <input
                  type="text"
                  name="text"
                  onChange={handleForm}
                  placeholder="Add a comment..."
                />
                <button>Post</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Explore;
