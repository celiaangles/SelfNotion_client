import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddGoblin(props) {
  const [garden, setGarden] = useState("");
  const [flower, setFlower] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nuvolId } = props;

    // Use FormData to handle file uploads
    const formData = new FormData();
    formData.append("garden", garden);
    formData.append("flower", flower);
    formData.append("nuvolId", nuvolId);
    formData.append("flowerImage", image); // Assuming you want to send the image file

    axios
      .post(`${API_URL}/api/goblins`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setGarden("");
        setFlower("");
        setImage(null);

        props.refreshNuvol();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddGoblin">
      <h3>Add New Goblin</h3>

      <form onSubmit={handleSubmit}>
        <label>Garden:</label>
        <input
          type="text"
          name="garden"
          value={garden}
          onChange={(e) => setGarden(e.target.value)}
        />

        <label>Flower Description:</label>
        <textarea
          type="text"
          name="flower"
          value={flower}
          onChange={(e) => setFlower(e.target.value)}
        />

        <label>Flower Image:</label>
        <input type="file" name="flower" onChange={handleImageChange} />

        <button type="submit">Add Goblin</button>
      </form>
    </div>
  );
}

export default AddGoblin;
