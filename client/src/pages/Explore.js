import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

import "./Explore.css";
import Hearth1 from "../resources/hearth1.svg";
import Hearth2 from "../resources/hearth2.svg";

const Explore = () => {
  const { setAlert } = useContext(MainContext);

  const [Posts, setPosts] = useState([]);
  const [form, setForm] = useState("");

  // const [liked, setLiked] = useState(false);

  const [refresh, setRefresh] = useState(false);

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
        console.log(resp.data);
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
                {/* ///////////////////////// */}
                <img
                  src={Hearth1}
                  alt="Beauty Parlor"
                  style={{ maxWidth: "25px" }}
                />
                <img
                  src={Hearth2}
                  alt="Beauty Parlor"
                  style={{ maxWidth: "40px" }}
                />
                {/* ////////////////////////////// */}
                {post.likes.length} likes
                <button onClick={() => handleLike(post.id)}>Like</button>
                {/* <button onClick={() => handleLike(post.id)}>Like</button> */}
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
