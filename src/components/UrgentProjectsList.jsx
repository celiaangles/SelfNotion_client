// UrgentProjectsList.jsx

import React, { useState, useEffect } from "react";

const API_URL = "http://localhost:5005";

const UrgentProjectsList = ({ userId }) => {
  const [urgentProjects, setUrgentProjects] = useState([]);

  useEffect(() => {
    // Fetch urgent projects from the server
    fetch(`${API_URL}/api/urgentedprojects/${userId}`)
      .then((response) => response.json())
      .then((data) => setUrgentProjects(data))
      .catch((error) =>
        console.error("Error fetching urgent projects:", error)
      );
  }, [userId]);

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {urgentProjects.map((project) => (
          <li key={project._id} style={{ marginBottom: "20px" }}>
            <strong>{project.title}</strong> <br />
            {project.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrgentProjectsList;
