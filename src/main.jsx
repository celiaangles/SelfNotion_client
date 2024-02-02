import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProjectProvider } from "../src/context/project.context.jsx";

import "./index.css";
import { BrowserRouter as Router } from "react-router-dom"; // Import the BrowserRouter

import { AuthProviderWrapper } from "./context/auth.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ProjectProvider>
        <AuthProviderWrapper>
          {" "}
          <App />
        </AuthProviderWrapper>{" "}
      </ProjectProvider>
    </Router>
  </React.StrictMode>
);
