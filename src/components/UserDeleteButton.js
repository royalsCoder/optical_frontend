// UserDeleteButton.js

import React, { useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { IoMdClose } from "react-icons/io";
import Cookies from "js-cookie";

const UserDeleteButton = ({ userId, onDelete }) => {
  const token = Cookies.get("loginToken");
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteuser/${userId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDialogOpen(false);
      onDelete(userId);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <button className="btn btn-danger" onClick={() => setDialogOpen(true)}>
        <DeleteIcon />
      </button>

      {isDialogOpen && (
        <div className="confirmation-dialog">
          <div className="title flex_middle">
            <div
              onClick={() => setDialogOpen(false)}
              style={{ textAlign: "right", fontSize: "1.6rem" }}
            >
              <IoMdClose />
            </div>
            <div style={{ marginRight: "0.5em", fontSize: "1.6rem" }}>
              Confirm Deletion
            </div>
          </div>
          <p>Are you sure you want to delete this user?</p>
          <button className="btn btn-secondary" onClick={handleDelete}>
            Yes
          </button>
          <button
            className="btn btn-success pl-4 marginbutton"
            onClick={() => setDialogOpen(false)}
          >
            No
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDeleteButton;
