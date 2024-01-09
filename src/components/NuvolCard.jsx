import { Link } from "react-router-dom";

// We are deconstructing props object directly in the parentheses of the function
function NuvolCard({ papallona, cuc, _id }) {
  return (
    <div className="NuvolCard card">
      <Link to={`/nuvols/${_id}`}>
        <h3>{papallona}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{cuc} </p>
    </div>
  );
}

export default NuvolCard;
