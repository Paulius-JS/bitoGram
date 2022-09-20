import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState("");

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/register", form).then((resp) => {
      console.log(resp.data);
      navigate("/");
    });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Register</h1>
              <form className="form-group " onSubmit={(e) => handleSubmit(e)}>
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  name="user_name"
                  placeholder="User Name"
                  onChange={handleForm}
                />
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  name="email"
                  onChange={handleForm}
                  placeholder="Email"
                />
                <input
                  type="text"
                  className="form-control mb-2 mr-sm-2"
                  name="password"
                  onChange={handleForm}
                  placeholder="Password"
                />

                <hr />
                <button className="btn btn btn-dark mb-2">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
