// import { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
// import axios from "axios";
// import AddTask from "../components/AddTask";
// import TaskCard from "../components/TaskCard";
// import heart_icon from "../assets/react.svg";
// import React, { useContext } from "react";

// import { AuthContext } from "../context/auth.context";

// const API_URL = "http://localhost:5005";

// function ProjectDetailsPage(props) {
//   const [project, setProject] = useState(null);
//   const { projectId } = useParams();
//   const [showAddTask, setShowAddTask] = useState(false); // State to control visibility
//   const navigate = useNavigate(); // Use useNavigate hook from react-router-dom

//   const getProject = () => {
//     const storedToken = localStorage.getItem("authToken");
//     axios
//       .get(`${API_URL}/api/projects/${projectId}`, {
//         headers: { Authorization: `Bearer ${storedToken}` },
//       })
//       .then((response) => {
//         const oneProject = response.data;
//         setProject(oneProject);
//       })
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     getProject();
//   }, []);

//   const authContext = useContext(AuthContext);
//   const { user } = authContext;

//   //get the likes

//   const addUrgents = async () => {
//     try {
//       const storedToken = localStorage.getItem("authToken");
//       // Assuming urgentId is a property of the project object
//       const projectId = project._id;

//       // const urgentId = project.urgentId;
//       const urgents = await axios.post(
//         `${API_URL}/api/urgents/${projectId}`,
//         { userId: user._id },
//         { headers: { Authorization: `Bearer ${storedToken}` } }
//       );
//       console.log(urgents.data);
//       navigate("/home", { state: { selectedProject: projectId } });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="ProjectDetails">
//       <button onClick={() => setShowAddTask(!showAddTask)}>Add Task</button>

//       {project && (
//         <>
//           <h1>{project.title}</h1>
//           <p>{project.description}</p>
//           <p>{project.character}</p>
//         </>
//       )}

//       {showAddTask && (
//         <AddTask refreshProject={getProject} projectId={projectId} />
//       )}

//       {/* <AddTask refreshProject={getProject} projectId={projectId} /> */}

//       {project &&
//         project.tasks.map((task) => <TaskCard key={task._id} {...task} />)}

//       <Link to="/projects">
//         <button>Back to projects</button>
//       </Link>

//       <Link to={`/projects/edit/${projectId}`}>
//         <button>Edit Project</button>
//       </Link>

//       <button className="heart_like" onClick={addUrgents}>
//         Add to favorites{" "}
//         <img className="heart_like_img" alt="" src={heart_icon}></img>
//       </button>
//     </div>
//   );
// }

// export default ProjectDetailsPage;

import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddTask from "../components/AddTask";
import TaskCard from "../components/TaskCard";
import heart_icon from "../assets/react.svg";
import { AuthContext } from "../context/auth.context";
import UrgentCard from "../components/UrgentCard";

const API_URL = "http://localhost:5005";

function ProjectDetailsPage(props) {
  const [project, setProject] = useState(null);
  const { projectId } = useParams();
  const [showAddTask, setShowAddTask] = useState(false);
  const navigate = useNavigate();

  const getProject = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .get(`${API_URL}/api/projects/${projectId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneProject = response.data;
        setProject(oneProject);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProject();
  }, []);

  const authContext = useContext(AuthContext);
  const { user } = authContext;

  const addUrgents = async () => {
    try {
      const storedToken = localStorage.getItem("authToken");
      const projectId = project._id;

      const urgents = await axios.post(
        `${API_URL}/api/urgents/${projectId}`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${storedToken}` } }
      );
      console.log(urgents.data);
      navigate("/home", { state: { selectedProject: project } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="ProjectDetails">
      <button onClick={() => setShowAddTask(!showAddTask)}>Add Task</button>

      {project && (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <p>{project.character}</p>
        </>
      )}

      {showAddTask && (
        <AddTask refreshProject={getProject} projectId={projectId} />
      )}

      {project &&
        project.tasks.map((task) => <TaskCard key={task._id} {...task} />)}

      <Link to="/projects">
        <button>Back to projects</button>
      </Link>

      <Link to={`/projects/edit/${projectId}`}>
        <button>Edit Project</button>
      </Link>

      <button className="heart_like" onClick={addUrgents}>
        Add to favorites{" "}
        <img className="heart_like_img" alt="" src={heart_icon}></img>
      </button>

      {/* Display UrgentCard if project is selected */}
      {project && <UrgentCard key={project._id} project={project} />}
    </div>
  );
}

export default ProjectDetailsPage;
