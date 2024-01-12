import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddNuvol(props) {
  const [papallona, setPapallona] = useState("");
  const [cuc, setCuc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { papallona, cuc };

    axios
      .post(`${API_URL}/api/nuvols`, requestBody)
      .then((response) => {
        // Reset the state
        setPapallona("");
        setCuc("");

        props.refreshNuvols();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddNuvol">
      <h3>Add Nuvol</h3>

      <form onSubmit={handleSubmit}>
        <label>Papallona:</label>
        <input
          type="text"
          name="papallona"
          value={papallona}
          onChange={(e) => setPapallona(e.target.value)}
        />

        <label>Cuc:</label>
        <textarea
          type="text"
          name="cuc"
          value={cuc}
          onChange={(e) => setCuc(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddNuvol;
