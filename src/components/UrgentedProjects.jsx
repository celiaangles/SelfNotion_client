// UrgentProjects.js

import React from "react";

const UrgentProjects = ({ urgentProjects }) => {
  return (
    <div>
      <h2>Urgent Projects</h2>
      <ul>
        {urgentProjects.map((project) => (
          <li key={project._id}>{project.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UrgentProjects;
