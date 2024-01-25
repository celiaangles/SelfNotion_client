import React from "react";
import Card from "./GenericCard"; // Adjust the import path as needed

// BruixaCard
function BruixaCard({ _id, gat, peix, refreshNuvol }) {
  return (
    <Card type="Bruixa" data={{ _id, gat, peix }} refreshNuvol={refreshNuvol} />
  );
}

export default BruixaCard;
