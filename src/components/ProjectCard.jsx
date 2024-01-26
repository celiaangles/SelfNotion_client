import { Link } from "react-router-dom";
import React, { useState } from "react";

function ProjectCard({ title, description, _id }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked((prevIsButtonClicked) => !prevIsButtonClicked);
  };

  const typographyStyle = {
    color: isButtonClicked ? "green" : "#646cff", // Change the color based on the state
  };
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h3 style={typographyStyle}>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <button onClick={handleButtonClick}>
        {isButtonClicked ? "Undone" : "Done"}
      </button>
    </div>
  );
}

export default ProjectCard;
