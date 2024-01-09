import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddProject(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [character, setCharacter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { title, description, character };

    axios
      .post(`${API_URL}/api/projects`, requestBody)
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        props.refreshProjects();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProject">
      <h3>Add Project</h3>

      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Character:</label>
        <textarea
          type="text"
          name="character"
          value={character}
          onChange={(e) => setCharacter(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProject;
