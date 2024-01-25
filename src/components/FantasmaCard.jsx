import React from "react";
import Card from "./GenericCard"; // Adjust the import path as needed

// FantasmaCard
function FantasmaCard({ _id, title, description, refreshNuvol }) {
  return (
    <Card
      type="Fantasma"
      data={{ _id, title, description }}
      refreshNuvol={refreshNuvol}
    />
  );
}

export default FantasmaCard;
