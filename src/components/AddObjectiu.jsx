import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddObjectiu(props) {
  const [serp, setSerp] = useState("");
  const [mico, setMico] = useState("");
  const [mussol, setMussol] = useState("");

  const { user } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      console.error("User not logged in.");
      return;
    }

    const requestBody = { serp, mico, mussol, userId: user._id };
    const storedToken = localStorage.getItem("authToken");

    axios
      .post(`${API_URL}/api/objectius`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        setSerp("");
        setMico("");
        setMussol("");

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

        <label>Mussol:</label>
        <textarea
          type="text"
          name="mussol"
          value={mussol}
          onChange={(e) => setMussol(e.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddObjectiu;
