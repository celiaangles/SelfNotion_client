// import { Link } from "react-router-dom";
// import React from "react";
// import { useProjectContext } from "../context/project.context";

// function ProjectCard({ title, description, _id, showButton = true }) {
//   const { projectState, updateProjectState } = useProjectContext();
//   const isButtonClicked = projectState[_id] || false;

//   const handleButtonClick = () => {
//     updateProjectState(_id, !isButtonClicked);
//   };

//   const typographyStyle = {
//     color: isButtonClicked ? "green" : "#646cff",
//   };

//   return (
//     <div className="ProjectCard card">
//       <Link to={`/projects/${_id}`}>
//         <h3 style={typographyStyle}>{title}</h3>
//         <h1>hzg</h1>
//         <p style={{ maxWidth: "400px" }}>{description}</p>
//       </Link>
//       {showButton && (
//         <button onClick={handleButtonClick}>
//           {isButtonClicked ? "Undone" : "Done"}
//         </button>
//       )}
//     </div>
//   );
// }

// export default ProjectCard;

import { Link } from "react-router-dom";
import React from "react";
import { useProjectContext } from "../context/project.context";

function ProjectCard({ title, description, _id, showButton = true, onDelete }) {
  const { projectState, updateProjectState } = useProjectContext();
  const isButtonClicked = projectState[_id] || false;

  const handleButtonClick = () => {
    updateProjectState(_id, !isButtonClicked);
  };

  const typographyStyle = {
    color: isButtonClicked ? "green" : "#646cff",
  };

  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h3 style={typographyStyle}>{title}</h3>
        <p style={{ maxWidth: "400px" }}>{description}</p>
      </Link>
      {showButton && (
        <>
          <button onClick={handleButtonClick}>
            {isButtonClicked ? "Undone" : "Done"}
          </button>
          {onDelete && (
            <button onClick={() => onDelete(_id)}>Delete Project</button>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectCard;
