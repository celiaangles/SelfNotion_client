import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function FantasmaCard({ _id, title, description, refreshNuvol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);

  const handleDelete = () => {
    axios
      .delete(`${API_URL}/api/fantasmes/${_id}`)
      .then(() => {
        refreshNuvol();
      })
      .catch((error) => console.log("Error deleting Fantasma:", error));
  };

  const handleUpdate = () => {
    axios
      .put(`${API_URL}/api/fantasmes/${_id}`, {
        title: updatedTitle,
        description: updatedDescription,
      })
      .then(() => {
        refreshNuvol();
        setIsEditing(false); // Hide the form after updating
      })
      .catch((error) => console.log("Error updating Fantasma:", error));
  };

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="Fantasma card">
      {isEditing ? (
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />

          <label>Description:</label>
          <textarea
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
          />

          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          <h3>{title}</h3>
          <p>{description}</p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleEditForm}>Update</button>
        </>
      )}
    </div>
  );
}

export default FantasmaCard;
