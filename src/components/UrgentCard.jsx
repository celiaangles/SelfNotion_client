import React, { useState } from "react";
import { Link } from "react-router-dom";

function UrgentCard({ project }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked((prevIsButtonClicked) => !prevIsButtonClicked);
  };

  const typographyStyle = {
    color: isButtonClicked ? "green" : "#646cff", // Change the color based on the state
  };
  return (
    <div className="liked_Project">
      <Link className="p_projects_link" to={`/projects/${project._id}`}>
        <h3 className="p_projects" style={typographyStyle}>
          {project.title}
        </h3>
        <p>jhvjhv</p>
      </Link>
      <p style={{ maxWidth: "400px" }}>{project.description}</p>
      <button onClick={handleButtonClick}>
        {isButtonClicked ? "Undone" : "Done"}
      </button>
    </div>
  );
}

export default UrgentCard;
