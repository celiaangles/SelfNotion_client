import "../styles/ProjectCard.css";

import { Link } from "react-router-dom";
import React from "react";
import { useProjectContext } from "../context/project.context";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ProjectCard({ title, description, _id, showButton = true, onDelete }) {
  const { projectState, updateProjectState } = useProjectContext();
  const isButtonClicked = projectState[_id] || false;

  const handleButtonClick = () => {
    updateProjectState(_id, !isButtonClicked);
  };

  const handleDeleteClick = () => {
    // Implement the logic to delete the project
    const authConfig = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    axios
      .delete(`${API_URL}/api/projects/${_id}`, authConfig)
      .then(() => {
        // If onDelete function is provided, call it
        if (onDelete) {
          onDelete(_id);
        }
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const typographyStyle = {
    color: isButtonClicked ? "#222222" : "#cacaca",
  };

  return (
    <div className="ProjectCard">
      {showButton && (
        <button className="button01" onClick={handleButtonClick}>
          {isButtonClicked ? (
            <img src="" alt="undone" />
          ) : (
            <img
              src="../../public/done_FILL0_wght400_GRAD0_opsz24.png"
              alt="Done"
            />
          )}
        </button>
      )}
      <Link to={`/projects/${_id}`}>
        <div className="tasca">
          <h3 style={typographyStyle} className="title">
            {title}
          </h3>
          <p style={typographyStyle} className="description">
            {description}
          </p>
        </div>
      </Link>

      {showButton && (
        <>
          <button className="button02" onClick={handleDeleteClick}>
            <img
              src="../../public/delete_FILL0_wght400_GRAD0_opsz24 (1).png"
              alt="delete"
            />
          </button>
          <button className="button02">
            <img
              src="../../public/add_FILL0_wght400_GRAD0_opsz24 (1).png"
              alt="plus"
            />{" "}
          </button>
        </>
      )}
    </div>
  );
}

export default ProjectCard;
