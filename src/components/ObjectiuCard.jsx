import { Link } from "react-router-dom";
import React, { useState } from "react";

function ObjectiuCard({ serp, mico, _id }) {
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    setIsButtonClicked((prevIsButtonClicked) => !prevIsButtonClicked);
  };

  const typographyStyle = {
    color: isButtonClicked ? "green" : "#646cff", // Change the color based on the state
  };

  return (
    <div className="ObjectiuCard card">
      <Link to={`/objectius/${_id}`}>
        <h3 style={typographyStyle}>{serp}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{mico} </p>
      <button onClick={handleButtonClick}>
        {isButtonClicked ? "Undone" : "Done"}
      </button>
    </div>
  );
}

export default ObjectiuCard;
