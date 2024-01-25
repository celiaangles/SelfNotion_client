import React from "react";
import Card from "./GenericCard"; // Adjust the import path as needed

// BruixaCard
function GoblinCard({ _id, garden, flower, refreshNuvol }) {
  return (
    <Card
      type="Goblin"
      data={{ _id, garden, flower }}
      refreshNuvol={refreshNuvol}
    />
  );
}

export default GoblinCard;
