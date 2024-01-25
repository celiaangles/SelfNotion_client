import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddGoblin(props) {
  const [garden, setGarden] = useState("");
  const [flower, setFlower] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nuvolId } = props;
    const requestBody = { garden, flower, nuvolId };

    axios
      .post(`${API_URL}/api/goblins`, requestBody)
      .then((response) => {
        setGarden("");
        setFlower("");

        props.refreshNuvol();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Add Goblin">
      <h3>Add New Goblin</h3>

      <form onSubmit={handleSubmit}>
        <label>Garden:</label>
        <input
          type="text"
          name="garden"
          value={garden}
          onChange={(e) => setGarden(e.target.value)}
        />

        <label>Flower:</label>
        <textarea
          type="text"
          name="flower"
          value={flower}
          onChange={(e) => setFlower(e.target.value)}
        />

        <button type="submit">Add dsdcsdfknfdsdfmsmfdsdcs</button>
      </form>
    </div>
  );
}

export default AddGoblin;
