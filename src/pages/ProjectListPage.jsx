import { useState, useEffect } from "react";
import axios from "axios";

import ProjectCard from "../components/ProjectCard";
import AddProject from "../components/AddProject";

import ObjectiuCard from "../components/ObjectiuCard";
import AddObjectiu from "../components/AddObjectiu";

const API_URL = "http://localhost:5005";

function ProjectListPage() {
  // const storedToken = localStorage.getItem("authToken");

  const [objectius, setObjectius] = useState([]);
  const [showAddObjectiu, setShowAddObjectiu] = useState(false); // new

  const [projects, setProjects] = useState([]);
  const [showAddProject, setShowAddProject] = useState(false); // State to control visibility

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
    axios
      .get(`${API_URL}/api/objectius`)
      .then((response) => setObjectius(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllProjects();
  }, []);

  useEffect(() => {
    getAllObjectius();
  }, []);

  return (
    <div className="ProjectListPage">
      <button onClick={() => setShowAddProject(!showAddProject)}>
        Add Project
      </button>

      <button onClick={() => setShowAddObjectiu(!showAddObjectiu)}>
        Add Objectiu
      </button>

      {/* Show AddProject component only when showAddProject state is true */}
      {showAddProject && <AddProject refreshProjects={getAllProjects} />}
      {showAddObjectiu && <AddObjectiu refreshObjectius={getAllObjectius} />}

      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}

      {objectius.map((objectiu) => (
        <ObjectiuCard key={objectiu._id} {...objectiu} />
      ))}
    </div>
  );
}

export default ProjectListPage;
