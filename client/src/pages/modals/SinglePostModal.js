import { useState, useContext } from "react";
import axios from "axios";
import MainContext from "../../context/MainContext";

import "./NewCommentM.css";

export const SinglePostModal = ({ open, onClose }) => {
  const { setRefresh } = useContext(MainContext);

  if (!open) return null;
  return (
    <div className="modal-wrapper">
      <div className="modal">asdasdsa</div>
    </div>
  );
};
