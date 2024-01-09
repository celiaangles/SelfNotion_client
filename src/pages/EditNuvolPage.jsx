import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function EditNuvolPage(props) {
  const [papallona, setPapallona] = useState("");
  const [cuc, setCuc] = useState("");

  const { nuvolId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/nuvols/${nuvolId}`)
      .then((response) => {
        const oneNuvol = response.data;
        setPapallona(oneNuvol.papallona);
        setCuc(oneNuvol.cuc);
      })
      .catch((error) => console.log(JODER02));
  }, [nuvolId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const requestBody = { papallona, cuc };

    axios
      .put(`${API_URL}/api/nuvols/${nuvolId}`, requestBody)
      .then((response) => {
        navigate(`/nuvols/${nuvolId}`);
      });
  };

  const deleteNuvol = () => {
    axios
      .delete(`${API_URL}/api/nuvols/${nuvolId}`)
      .then(() => {
        navigate("/nuvols");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="EditNuvolPage">
      <h3>Edit the Nuvol</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Papallona:</label>
        <input
          type="text"
          name="papallona"
          value={papallona}
          onChange={(e) => setPapallona(e.target.value)}
        />

        <label>Cuc:</label>
        <textarea
          name="cuc"
          value={cuc}
          onChange={(e) => setCuc(e.target.value)}
        />

        <button type="submit">Update Nuvol</button>
      </form>

      <button onClick={deleteNuvol}>Delete Nuvol</button>
    </div>
  );
}

export default EditNuvolPage;
