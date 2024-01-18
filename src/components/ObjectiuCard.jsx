import { Link } from "react-router-dom";

function ObjectiuCard({ serp, mico, _id }) {
  return (
    <div className="ObjectiuCard card">
      <Link to={`/objectius/${_id}`}>
        <h3>{serp}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{mico} </p>
    </div>
  );
}

export default ObjectiuCard;
