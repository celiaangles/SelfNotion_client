import React from "react";
import { Link } from "react-router-dom";

function UrgentCard({ project }) {
  return (
    <div className="liked_Project">
      <Link className="p_projects_link" to={`/projects/${project._id}`}>
        <p className="p_projects">{project.title}</p>
      </Link>
      <p>Description: {project.description}</p>
      <p>Character: {project.character}</p>
    </div>
  );
}

export default UrgentCard;
