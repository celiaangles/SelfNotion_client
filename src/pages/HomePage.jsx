import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import UrgentCard from "../components/UrgentCard";

function HomePage() {
  const { urgentedProjects } = useContext(AuthContext);
  const location = useLocation();
  const [selectedProject, setSelectedProject] = useState(null);

  // Access selectedProject in your component as needed
  console.log("Selected Project:", selectedProject);

  useEffect(() => {
    if (location.state && location.state.selectedProject) {
      setSelectedProject(location.state.selectedProject);
    }
  }, [location.state]);

  const currentDate = new Date();
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div>
      <h1>{formattedDate}</h1>

      <p></p>

      {selectedProject ? (
        <div className="project-details">
          <h2>{selectedProject.title}</h2>
          <p>{selectedProject.description}</p>
        </div>
      ) : (
        <p>No urgented projects found.</p>
      )}

      <div className="urgented_Projects">
        {urgentedProjects && urgentedProjects.length > 0 ? (
          urgentedProjects.map((project) => (
            <UrgentCard key={project._id} project={project} />
          ))
        ) : (
          <p>...</p>
        )}
        {console.log("Urgented Projects:", urgentedProjects)}
      </div>
    </div>
  );
}

export default HomePage;
