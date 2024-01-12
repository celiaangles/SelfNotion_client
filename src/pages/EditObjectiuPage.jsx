import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditObjectiuPage(props) {
  const [serp, setSerp] = useState("");
  const [mico, setMico] = useState("");

  const { objectiuId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/objectius/${objectiuId}`)
      .then((response) => {
        const oneObjectiu = response.data;
        setSerp(oneObjectiu.serp);
        setMico(oneObjectiu.mico);
      })
      .catch((err) => console.log(err));
  }, [objectiuId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { serp, mico };

    axios
      .put(`${API_URL}/api/objectius/${objectiuId}`, requestBody)
      .then((response) => {
        navigate(`/objectius/${objectiuId}`);
      });
  };

  const deleteObjectiu = () => {
    axios
      .delete(`${API_URL}/api/objectius/${objectiuId}`)
      .then(() => {
        navigate("/objectius");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditObjectiusPage">
      <h3>Edit the Objectiu</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Serp:</label>
        <input
          type="text"
          name="serp"
          value={serp}
          onChange={(e) => setSerp(e.target.value)}
        />

        <label>Mico:</label>
        <textarea
          name="mico"
          value={mico}
          onChange={(e) => setMico(e.target.value)}
        />

        <button type="submit">Update Objectiu</button>
      </form>

      <button onClick={deleteObjectiu}>Delete Objectiu</button>
    </div>
  );
}

export default EditObjectiuPage;
