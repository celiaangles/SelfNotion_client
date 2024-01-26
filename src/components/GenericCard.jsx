import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Card({ type, data, refreshNuvol }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(data.title || "");
  const [updatedDescription, setUpdatedDescription] = useState(
    data.description || ""
  );
  const [updatedGarden, setUpdatedGarden] = useState(data.garden || "");
  const [updatedFlower, setUpdatedFlower] = useState(data.flower || "");
  const [isDone, setIsDone] = useState(false);

  // Destructuring data based on the type
  const { _id } = data;

  const handleDelete = () => {
    axios
      .delete(
        `${API_URL}/api/${
          type === "Fantasma"
            ? "fantasmes"
            : type === "Bruixa"
            ? "bruixes"
            : "goblins"
        }/${_id}`
      )
      .then(() => {
        refreshNuvol();
      })
      .catch((error) => console.log(`Error deleting ${type}:`, error));
  };
  const getImageElement = () => {
    if (
      type === "Goblin" &&
      data.flower &&
      data.flower.contentType &&
      data.flower.data
    ) {
      return (
        <img
          src={`data:${
            data.flower.contentType
          };base64,${data.flower.data.toString("base64")}`}
          alt="Flower"
        />
      );
    }
    return null;
  };

  const handleUpdate = () => {
    let updateData;

    if (type === "Fantasma") {
      updateData = { title: updatedTitle, description: updatedDescription };
    } else if (type === "Bruixa") {
      updateData = { gat: updatedGarden, peix: updatedFlower };
    } else if (type === "Goblin") {
      updateData = { garden: updatedGarden, flower: updatedFlower };
    }

    axios
      .put(
        `${API_URL}/api/${
          type === "Fantasma"
            ? "fantasmes"
            : type === "Bruixa"
            ? "bruixes"
            : "goblins"
        }/${_id}`,
        updateData
      )
      .then(() => {
        refreshNuvol();
        setIsEditing(false); // Hide the form after updating
      })
      .catch((error) => console.log(`Error updating ${type}:`, error));
  };

  const toggleEditForm = () => {
    setIsEditing(!isEditing);
  };

  const toggleDone = () => {
    setIsDone(!isDone);
  };

  const colorStyle = {
    color: isDone ? "green" : "black",
  };

  return (
    <div key={_id} className={`${type} card`}>
      {isEditing ? (
        <div>
          <label>Title:</label>
          {/* ... (existing code) */}

          <label>Description:</label>
          {/* ... (existing code) */}

          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <>
          <h3 style={colorStyle}>
            {type === "Fantasma"
              ? data.title
              : type === "Bruixa"
              ? data.gat
              : data.garden}
          </h3>
          {getImageElement()} {/* Add this line to display the image */}
          <p style={colorStyle}>
            {type === "Fantasma"
              ? data.description
              : type === "Bruixa"
              ? data.peix
              : type === "Goblin"
              ? `ContentType: ${data.flower.contentType}, Data: ${data.flower.data}`
              : ""}
          </p>
          <button onClick={handleDelete}>Delete</button>
          <button onClick={toggleEditForm}>Update</button>
        </>
      )}
      <button
        onClick={toggleDone}
        style={{ display: type === "Bruixa" ? "block" : "none" }}
      >
        {isDone ? "Undone" : "Done"}
      </button>
    </div>
  );
}

export default Card;
