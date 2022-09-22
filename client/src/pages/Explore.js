import { useState, useEffect, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

import "./Explore.css";
import Hearth1 from "../resources/hearth1.svg";
import Hearth2 from "../resources/hearth2.svg";
import { SinglePostModal } from "./modals/SinglePostModal";

const Explore = () => {
  const { userInfo } = useContext(MainContext);

  const { setRefresh, refresh } = useContext(MainContext);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = useCallback(
    (id) => () => {
      setOpenModal(!openModal);
      console.log("post id:", id);
    },
    []
  );

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
              <Link
                className="instagram-card-user-name"
                to={`/profile/${post.userId}`}
              >
                <img
                  src={post.user.image}
                  alt={post.user.image}
                  className="instagram-card-user-image"
                />

                {post.user.user_name}
              </Link>
              <p className="comments">
                {/* show date lt-Lt no seconds */}

                {new Date(post.createdAt).toLocaleString("lt-LT", {
                  timeZone: "Europe/Vilnius",
                  year: "numeric",
                  month: "numeric",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            {/* MODAL SPOTAS */}
            {/* /* EXAMPLE */}

            {/* <div >
              <button  onClick={() => setOpenModal(true)}>
                New Post
              </button>
              ////////////////////////////////
              <SinglePostModal
                open={openModal}
                onClose={() => setOpenModal(false)}
              />
            </div> */}

            <div className="intagram-card-image" onClick={toggleModal(post.id)}>
              <img src={post.image} alt={post.image} />
              <SinglePostModal
                Open={openModal}
                onClose={toggleModal(post.id)}
              />
            </div>
            {/* END */}
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
              {/* if comments more then 5 dont show them */}

              {post.comments.length > 5 ? (
                <p className="comments">
                  <Link
                    className="instagram-card-user-name"
                    to={`/post/${post.id}`}
                  >
                    View all comments
                  </Link>
                </p>
              ) : (
                post.comments.map((comment) => (
                  <p key={comment.id} className="comments">
                    <Link
                      className="instagram-card-user-name"
                      to={`/profile/${comment.userId}`}
                    >
                      {comment.user.user_name}
                    </Link>{" "}
                    {comment.text}
                  </p>
                ))
              )}
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
