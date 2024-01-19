// import React, { useContext, useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/auth.context"; // Import AuthContext

// function HomePage() {
//   const location = useLocation();
//   const [selectedProjects, setSelectedProjects] = useState([]);
//   const authContext = useContext(AuthContext); // Use AuthContext

//   useEffect(() => {
//     console.log("Location state:", location.state);

//     const fetchData = async () => {
//       if (location.state && location.state.selectedProject) {
//         console.log("Selected Projects:", location.state.selectedProjects);

//         const projectIds = location.state.selectedProject.map(
//           (project) => project._id
//         );
//         console.log("Project IDs:", projectIds);

//         try {
//           const storedToken = localStorage.getItem("authToken");
//           const response = await axios.get(
//             `http://localhost:5005/api/urgentedprojects/${authContext.user._id}`, // Use authContext.user instead of user
//             {
//               params: { projectIds }, // Send projectIds as query parameters
//               headers: { Authorization: `Bearer ${storedToken}` },
//             }
//           );
//           console.log("Server response:", response.data);

//           setSelectedProjects(response.data);
//         } catch (error) {
//           console.error("Error fetching urgent projects:", error);
//         }
//       } else {
//         // Handle the case when location.state or location.state.selectedProject is null
//         console.log("No selected projects found in location state.");
//         setSelectedProjects([]);
//       }
//     };

//     fetchData();
//   }, [location.state, authContext.user]); // Add authContext.user to dependencies

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

//       <p></p>

//       {selectedProjects.length > 0 ? (
//         <div className="urgented-projects">
//           {selectedProjects.map((project) => (
//             <div key={project._id} className="project-details">
//               <h2>{project.title}</h2>
//               <p>{project.description}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No urgented projects found.</p>
//       )}
//     </div>
//   );
// }

// export default HomePage;

// HomePage.jsx

// import React from "react";
// import UrgentProjectsList from "../components/UrgentProjectsList"; // Adjust the path based on your file structure

// const HomePage = () => {
//   // Replace '123' with the actual userId (you may get it from authentication or another source)
//   const userId = "65aa395198798033a561f37a";

//   return (
//     <div>
//       <h1>Home Page</h1>
//       {/* Render the UrgentProjectsList component and pass the userId */}
//       <UrgentProjectsList userId={userId} />
//     </div>
//   );
// };

// export default HomePage;

import React, { useContext } from "react";
import UrgentProjectsList from "../components/UrgentProjectsList";
import { AuthContext } from "../context/auth.context"; // Adjust the path based on your file structure

const HomePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Handle the case when the user is not authenticated
    return (
      <div>
        <h1>Home Page</h1>
        <p>User not authenticated. Please log in.</p>
      </div>
    );
  }

  const userId = user._id; // Assuming the user object has an _id property

  return (
    <div>
      <h1>Home Page</h1>
      {/* Render the UrgentProjectsList component and pass the userId */}
      <UrgentProjectsList userId={userId} />
    </div>
  );
};

export default HomePage;
