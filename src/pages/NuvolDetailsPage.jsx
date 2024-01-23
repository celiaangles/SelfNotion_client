import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddFantasma from "../components/AddFantasma";
import FantasmaCard from "../components/FantasmaCard";

const API_URL = "http://localhost:5005";

function NuvolDetailsPage(props) {
  const [nuvol, setNuvol] = useState(null);
  const [showAddFantasmaForm, setShowAddFantasmaForm] = useState(false); // State to control form visibility
  const { nuvolId } = useParams();

  const getNuvol = () => {
    axios
      .get(`${API_URL}/api/nuvols/${nuvolId}`)
      .then((response) => {
        const oneNuvol = response.data;
        setNuvol(oneNuvol);
      })
      .catch((error) => console.log("joder"));
  };

  useEffect(() => {
    getNuvol();
  }, []);

  const handleToggleForm = () => {
    setShowAddFantasmaForm(!showAddFantasmaForm);
  };

  return (
    <div className="NuvolDetails">
      {nuvol && (
        <>
          <h1>{nuvol.papallona}</h1>
          <p>{nuvol.cuc}</p>
        </>
      )}

      <button onClick={handleToggleForm}>
        {showAddFantasmaForm ? "Hide Add Fantasma Form" : "Add Fantasma"}
      </button>

      {showAddFantasmaForm && (
        <AddFantasma refreshNuvol={getNuvol} nuvolId={nuvolId} />
      )}
      {nuvol &&
        nuvol.fantasmes.map((fantasma) => (
          <FantasmaCard key={fantasma._id} {...fantasma} />
        ))}

      <Link to="/nuvols">
        <button>Back to nuvols</button>
      </Link>

      <Link to={`/nuvols/edit/${nuvolId}`}>
        <button>Edit Nuvol</button>
      </Link>
    </div>
  );
}

export default NuvolDetailsPage;
