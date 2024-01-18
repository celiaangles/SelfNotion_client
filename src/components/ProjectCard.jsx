import { Link } from "react-router-dom";

function ProjectCard({ title, description, character, _id }) {
  return (
    <div className="ProjectCard card">
      <Link to={`/projects/${_id}`}>
        <h3>{title}</h3>
      </Link>
      <p style={{ maxWidth: "400px" }}>{description} </p>
      <p style={{ maxWidth: "400px" }}>{character} </p>
    </div>
  );
}

export default ProjectCard;
