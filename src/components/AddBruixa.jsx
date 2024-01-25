import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddBruixa(props) {
  const [gat, setGat] = useState("");
  const [peix, setPeix] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nuvolId } = props;
    const requestBody = { gat, peix, nuvolId };

    axios
      .post(`${API_URL}/api/bruixes`, requestBody)
      .then((response) => {
        setGat("");
        setPeix("");

        props.refreshNuvol();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddBruixa">
      <h3>Add New Fdsc</h3>

      <form onSubmit={handleSubmit}>
        <label>Gat:</label>
        <input
          type="text"
          name="gat"
          value={gat}
          onChange={(e) => setGat(e.target.value)}
        />

        <label>Description:</label>
        <textarea
          type="text"
          name="peix"
          value={peix}
          onChange={(e) => setPeix(e.target.value)}
        />

        <button type="submit">Add dsdcsdcs</button>
      </form>
    </div>
  );
}

export default AddBruixa;
