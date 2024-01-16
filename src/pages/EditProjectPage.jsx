import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import axios from "axios";

const API_URL = "http://localhost:5005";

function EditProjectPage(props) {
  const { isLoggedIn } = useContext(AuthContext);
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Move authConfig definition outside of useEffect and handleFormSubmit
  const authConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      // Handle not logged in scenario
      console.error("User not logged in.");
      return;
    }

    axios
      .get(`${API_URL}/api/projects/${projectId}`, authConfig)
      .then((response) => {
        const oneProject = response.data;
        setTitle(oneProject.title);
        setDescription(oneProject.description);
      })
      .catch((error) => console.log(error));
  }, [projectId, isLoggedIn, authConfig]); // Include authConfig as a dependency

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description };

    axios
      .put(`${API_URL}/api/projects/${projectId}`, requestBody, authConfig)
      .then((response) => {
        navigate(`/projects/${projectId}`);
      });
  };

  const deleteProject = () => {
    axios
      .delete(`${API_URL}/api/projects/${projectId}`, authConfig)
      .then(() => {
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditProjectPage">
      <h3>Edit the Project</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Update Project</button>
      </form>

      <button onClick={deleteProject}>Delete Project</button>
    </div>
  );
}

export default EditProjectPage;
