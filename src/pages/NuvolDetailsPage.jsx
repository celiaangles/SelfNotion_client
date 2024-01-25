import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AddFantasma from "../components/AddFantasma";
// import AddBruixa from "../components/AddBruixa";
// import BruixaCard from "../components/BruixaCard";

import FantasmaCard from "../components/FantasmaCard";

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
        console.log("API response:", response.data); // Log the entire response
        setNuvol(oneNuvol);
      })
      .catch((error) => console.log("Error fetching data:", error));
  };

  useEffect(() => {
    getNuvol();
  }, []);

  const handleToggleFantasmaForm = () => {
    setShowAddFantasmaForm(!showAddFantasmaForm);
    // If hiding the form, reset the form fields
    if (!showAddFantasmaForm) {
      // Implement a function to reset the form fields in AddFantasma component
      // Example: resetFormFields();
    }
  };

  // const handleToggleBruixaForm = () => {
  //   setShowAddBruixaForm(!showAddBruixaForm);
  //   // If hiding the form, reset the form fields
  //   if (!showAddBruixaForm) {
  //     // Implement a function to reset the form fields in AddFantasma component
  //     // Example: resetFormFields();
  //   }
  // };

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
        nuvol.fantasmes && // Add null check for fantasmes
        nuvol.fantasmes.map((fantasma) => (
          <FantasmaCard
            key={fantasma._id}
            {...fantasma}
            refreshNuvol={getNuvol}
          />
        ))}

      {/* <button onClick={handleToggleBruixaForm}>
        {showAddBruixaForm ? "Hide Add Bruixa Form" : "Add Bruixa"}
      </button> */}
      {/* 
      {showAddBruixaForm && (
        <AddBruixa refreshNuvol={getNuvol} nuvolId={nuvolId} />
      )}
      {nuvol &&
        nuvol.bruixes && // Add null check for bruixes
        nuvol.bruixes.map((bruixa) => (
          <BruixaCard
            key={bruixa._id} // Add a unique key prop
            {...bruixa}
            refreshNuvol={getNuvol}
          />
        ))} */}

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
