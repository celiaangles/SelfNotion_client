import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import heart_icon from "../assets/react.svg";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function ProjectDetailsPage() {
  const [project, setProject] = useState(null);
  const [userId, setUserId] = useState("");

  const { projectId } = useParams();
  const navigate = useNavigate();

  // const { user } = useContext(AuthContext);

  const getProject = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
        setUserId(response.data.userId);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject();
  }, []);

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const addUrgents = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");

      const urgents = await axios.post(
        `${API_URL}/api/urgents/${projectId}`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(urgents.data);
      navigate("/home", { state: { selectedProject: project } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ProjectDetails">
      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <p>{project.character}</p>
        </>
      )}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`å/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>

      <button className="heart_like" onClick={addUrgents}>
        Add to favorites{" "}
        <img className="heart_like_img" alt="" src={heart_icon}></img>
      </button>
    </div>
  );
}

export default ProjectDetailsPage;
