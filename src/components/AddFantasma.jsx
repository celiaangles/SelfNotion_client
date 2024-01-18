import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddFantasma(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nuvolId } = props;
    const requestBody = { title, description, nuvolId };

    axios
      .post(`${API_URL}/api/fantasmes`, requestBody)
      .then((response) => {
        setTitle("");
        setDescription("");

        props.refreshNuvol();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddFantasma">
      <h3>Add New Fantasma</h3>

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

        <button type="submit">Add Fantasma</button>
      </form>
    </div>
  );
}

export default AddFantasma;
