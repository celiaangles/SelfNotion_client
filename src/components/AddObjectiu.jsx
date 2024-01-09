import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddObjectiu(props) {
  const [serp, setSerp] = useState("");
  const [mico, setMico] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { serp, mico };

    axios
      .post(`${API_URL}/api/objectius`, requestBody)
      .then((response) => {
        // Reset the state
        setObjectiu("");
        setObjectiu("");
        props.refreshObjectius();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddObjectiu">
      <h3>Add Objectiu</h3>

      <form onSubmit={handleSubmit}>
        <label>Serp:</label>
        <input
          type="text"
          name="serp"
          value={serp}
          onChange={(e) => setSerp(e.target.value)}
        />

        <label>Mico:</label>
        <textarea
          type="text"
          name="mico"
          value={mico}
          onChange={(e) => setMico(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddObjectiu;
