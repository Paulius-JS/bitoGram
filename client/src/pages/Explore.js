import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import MainContext from "../context/MainContext";

import "./Explore.css";
import Hearth1 from "../resources/hearth1.svg";
import Hearth2 from "../resources/hearth2.svg";

const Explore = () => {
  const { setAlert } = useContext(MainContext);

  //   const [openModal, setOpenModal] = useState(false);

  const [Posts, setPosts] = useState([]);
  const [form, setForm] = useState("");
  const [users, setUsers] = useState([]);
  const [liked, setLiked] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [showResults, setShowResults] = useState(false);

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
  // ///////////////////////////////////////////////////////////////
  //   const handleSearch = (e) => {
  //     e.preventDefault();

  //     if (e.target.value === "") return setShowResults(false);

  //     axios
  //       .get("/api/search/" + e.target.value)
  //       .then((resp) => {
  //         setUsers(resp.data);
  //         setShowResults(true);
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  // /////////////////////////////////////////////////////////////////
  return (
    <>
      <div className="explore">
        {Posts.map((post) => (
          <div key={post.id} className="instagram-card">
            <div className="instagram-card-header">
              <img
                src={post.user.image}
                className="instagram-card-user-image"
              />

              <Link
                className="instagram-card-user-name"
                to={`/profile/${post.userId}`}
              >
                {post.user.user_name}
              </Link>
              {/* Later add time then  */}
            </div>

            <div className="intagram-card-image">
              <img src={post.image} />
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
              {/* Add all coment count to under this comment */}
              {/* <p className="comments">Will Show all coment count 9999</p> */}
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
