import { useState } from "react";
import axios from "axios";

import "./RegisterModal.css";

export const RegisterModal = ({ open, onClose }) => {
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
      onClose();
    });
  };

  if (!open) return null;
  return (
    <>
      <div className="modal-wrapper">
        <div className="modalRegister">
          <div className="modal-header">
            <span className="registerHeader">Register</span>
            <span className="close-modal-btn" onClick={onClose}>
              X
            </span>
          </div>

          <div className="modal-contentRegister">
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
    </>
  );
};

export default RegisterModal;
