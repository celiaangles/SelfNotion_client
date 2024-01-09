import { useState, useEffect } from "react";
import axios from "axios";

import NuvolCard from "../components/NuvolCard";
import AddNuvol from "../components/AddNuvol";

const API_URL = "http://localhost:5005";

function NuvolListPage() {
  const [nuvols, setNuvols] = useState([]);
  const [showAddNuvol, setShowAddNuvol] = useState(false); // new

  const getAllNuvols = () => {
    axios
      .get(`${API_URL}/api/nuvols`)
      .then((response) => setNuvols(response.data))
      .catch((error) => console.log(error));
  };

  // We set this effect will run only once, after the initial render
  // by setting the empty dependency array - []
  useEffect(() => {
    getAllNuvols();
  }, []);

  return (
    <div className="NuvolListPage">
      <button onClick={() => setShowAddNuvol(!showAddNuvol)}>Add Nuvol</button>

      {showAddNuvol && <AddNuvol refreshProjects={getAllNuvols} />}

      {nuvols.map((nuvol) => (
        <NuvolCard key={nuvol._id} {...nuvol} />
      ))}
    </div>
  );
}

export default NuvolListPage;
