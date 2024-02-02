import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProjectsObjectius.css";

import ProjectCard from "../components/ProjectCard";
import AddProject from "../components/AddProject";
import ObjectiuCard from "../components/ObjectiuCard";
import AddObjectiu from "../components/AddObjectiu";

const API_URL = "http://localhost:5005";

function ProjectListPage() {
  const [objectius, setObjectius] = useState([]);
  const [showAddObjectiu, setShowAddObjectiu] = useState(false);

  const [projects, setProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false);

  const getAllProjects = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));
  };

  const getAllObjectius = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/objectius`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setObjectius(response.data))
      .catch((error) => {
        console.error("Error fetching objectius:", error);
        // Handle the error (e.g., show a message to the user)
      });
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    getAllObjectius();
  }, []);

  return (
    <div className="ProjectListPage">
      {showAddProject && <AddProject refreshProjects={getAllProjects} />}
      {showAddObjectiu && <AddObjectiu refreshObjectius={getAllObjectius} />}
      <div className="projects">
        {projects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}

        <button
          className="button03"
          onClick={() => setShowAddProject(!showAddProject)}
        >
          ADD PROJECT
        </button>
      </div>

      <div className="objectius">
        {objectius.map((objectiu) => (
          <ObjectiuCard key={objectiu._id} {...objectiu} />
        ))}
        <button
          className="button03"
          onClick={() => setShowAddObjectiu(!showAddObjectiu)}
        >
          ADD OBJECTIU
        </button>
      </div>
    </div>
  );
}

export default ProjectListPage;
