// We are deconstructing the props object directly in the parentheses of the function
function FantasmaCard({ title, description }) {
  return (
    <div className="Fantasma card">
      <h3>{title}</h3>
      <h4>Description:</h4>

      <p>{description}</p>
    </div>
  );
}

export default FantasmaCard;
