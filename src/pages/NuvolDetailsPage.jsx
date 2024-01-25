import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddFantasma from "../components/AddFantasma";
import AddBruixa from "../components/AddBruixa";
import Card from "../components/GenericCard";

const API_URL = "http://localhost:5005";

function NuvolDetailsPage(props) {
  const [nuvol, setNuvol] = useState(null);
  const [showAddFantasmaForm, setShowAddFantasmaForm] = useState(false);
  const [showAddBruixaForm, setShowAddBruixaForm] = useState(false);

  const { nuvolId } = useParams();

  const getNuvol = () => {
    axios
      .get(`${API_URL}/api/nuvols/${nuvolId}`)
      .then((response) => {
        const oneNuvol = response.data;
        console.log("API response:", response.data);
        setNuvol(oneNuvol);
      })
      .catch((error) => console.log("Error fetching data:", error));
  };

  useEffect(() => {
    getNuvol();
  }, []);

  const handleToggleFantasmaForm = () => {
    setShowAddFantasmaForm(!showAddFantasmaForm);
  };

  const handleToggleBruixaForm = () => {
    setShowAddBruixaForm(!showAddBruixaForm);
  };

  return (
    <div className="NuvolDetails">
      {nuvol && (
        <>
          <h1>{nuvol.papallona}</h1>
          <p>{nuvol.cuc}</p>
        </>
      )}

      <button onClick={handleToggleFantasmaForm}>
        {showAddFantasmaForm ? "Hide Add Fantasma Form" : "Add Fantasma"}
      </button>

      {showAddFantasmaForm && (
        <AddFantasma refreshNuvol={getNuvol} nuvolId={nuvolId} />
      )}

      {nuvol &&
        nuvol.fantasmes &&
        nuvol.fantasmes.map((fantasma) => (
          <Card
            key={`Fantasma-${fantasma._id}`}
            type="Fantasma"
            data={fantasma}
            refreshNuvol={getNuvol}
          />
        ))}

      <button onClick={handleToggleBruixaForm}>
        {showAddBruixaForm ? "Hide Add Bruixa Form" : "Add Bruixa"}
      </button>

      {showAddBruixaForm && (
        <AddBruixa refreshNuvol={getNuvol} nuvolId={nuvolId} />
      )}

      {nuvol &&
        nuvol.bruixes &&
        nuvol.bruixes.map((bruixa) => (
          <Card
            key={`Bruixa-${bruixa._id}`}
            type="Bruixa"
            data={bruixa}
            refreshNuvol={getNuvol}
          />
        ))}

      <br />

      <h1>joder</h1>
      <br />

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
