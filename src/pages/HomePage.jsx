// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { AuthContext } from "../context/auth.context";
// import UrgentCard from "../components/UrgentCard";

// function HomePage() {
//   const { urgentedProjects } = useContext(AuthContext);
//   const location = useLocation();
//   const selectedProject = location.state && location.state.selectedProject;

//   // Access selectedProject in your component as needed
//   console.log("Selected Project:", selectedProject);

//   // Get the current date
//   const currentDate = new Date();
//   const options = {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   };
//   const formattedDate = currentDate.toLocaleDateString("en-US", options);

//   return (
//     <div>
//       <h1>{formattedDate}</h1>

//       {/* Display the current date */}
//       <p>homepage</p>

//       {selectedProject ? (
//         <div className="project-details">
//           <h2>{selectedProject.title}</h2>
//           <p>Description: {selectedProject.description}</p>
//           {/* Add more details here based on your project structure */}
//         </div>
//       ) : (
//         <p>No urgented projects found.</p>
//       )}

//       <div className="urgented_Projects">
//         <p className="p_projects">Urgented Projects:</p>
//         {urgentedProjects && urgentedProjects.length > 0 ? (
//           urgentedProjects.map((project) => (
//             <UrgentCard key={project._id} project={project} />
//           ))
//         ) : (
//           <p>No urgented projects found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

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
    // Check if location.state is available and set selectedProject
    if (location.state && location.state.selectedProject) {
      setSelectedProject(location.state.selectedProject);
    }
  }, [location.state]);

  // Get the current date
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

      {/* Display the current date */}
      <p>homepage</p>

      {selectedProject ? (
        <div className="project-details">
          <h2>{selectedProject.title}</h2>
          <p>Description: {selectedProject.description}</p>
          {/* Add more details here based on your project structure */}
        </div>
      ) : (
        <p>No urgented projects found.</p>
      )}

      <div className="urgented_Projects">
        <p className="p_projects">Urgented Projects:</p>
        {urgentedProjects && urgentedProjects.length > 0 ? (
          urgentedProjects.map((project) => (
            <UrgentCard key={project._id} project={project} />
          ))
        ) : (
          <p>No urgented projects found.</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
