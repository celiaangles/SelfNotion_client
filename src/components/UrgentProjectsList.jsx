import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCard"; // Make sure to provide the correct path to the ProjectCard component

const API_URL = "http://localhost:5005";

const UrgentProjectsList = ({ userId }) => {
  const [urgentProjects, setUrgentProjects] = useState([]);
  const [duplicateIds, setDuplicateIds] = useState(new Set());

  useEffect(() => {
    // Fetch urgent projects from the server
    fetch(`${API_URL}/api/urgentedprojects/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        // Filter out projects with duplicate IDs
        const uniqueProjects = [];
        const seenIds = new Set();

        data.forEach((project) => {
          if (!seenIds.has(project._id)) {
            uniqueProjects.push(project);
            seenIds.add(project._id);
          } else {
            setDuplicateIds((prevIds) => new Set([...prevIds, project._id]));
          }
        });

        setUrgentProjects(uniqueProjects);
      })
      .catch((error) =>
        console.error("Error fetching urgent projects:", error)
      );
  }, [userId]);

  const handleDeleteProject = (projectId) => {
    // Implement the logic to delete the project
    console.log(`Deleting project with ID: ${projectId}`);
  };

  return (
    <div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {urgentProjects.map((project) => (
          <li
            key={project._id}
            style={{
              marginBottom: "20px",
              color: duplicateIds.has(project._id) ? "red" : "inherit",
            }}
          >
            {duplicateIds.has(project._id) ? (
              <span>
                {/* Duplicate ID: <strong>{project._id}</strong>.{" "} */}
                {/* <Link to={`/projects/${project._id}`}> */}
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  _id={project._id}
                  showButton={false}
                  onDelete={handleDeleteProject}
                />
              </span>
            ) : (
              <Link to={`/projects/${project._id}`}>
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  _id={project._id}
                  showButton={false}
                  onDelete={handleDeleteProject}
                />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrgentProjectsList;
