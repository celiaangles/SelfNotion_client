import { useState, useEffect } from "react";
import axios from "axios";

import NuvolCard from "../components/NuvolCard";
import AddNuvol from "../components/AddNuvol";

const API_URL = "http://localhost:5005";

function NuvolListPage() {
  const [nuvols, setNuvols] = useState([]);
  const [showAddNuvol, setShowAddNuvol] = useState(false);

  const getAllNuvols = () => {
    axios
      .get(`${API_URL}/api/nuvols`)
      .then((response) => {
        console.log("API Response:", response.data);
        setNuvols(response.data); // Adjust according to your response structure
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllNuvols();
  }, []);

  console.log("Nuvols:", nuvols);

  return (
    <div className="NuvolListPage">
      <button onClick={() => setShowAddNuvol(!showAddNuvol)}>Add Nuvol</button>

      {showAddNuvol && <AddNuvol refreshNuvols={getAllNuvols} />}

      {Array.isArray(nuvols) ? (
        nuvols.map((nuvol) => <NuvolCard key={nuvol._id} {...nuvol} />)
      ) : (
        <p>No nuvols found.</p>
      )}
    </div>
  );
}

export default NuvolListPage;
