import React, { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projectState, setProjectState] = useState({});

  const updateProjectState = (projectId, isButtonClicked) => {
    setProjectState((prevProjectState) => ({
      ...prevProjectState,
      [projectId]: isButtonClicked,
    }));
  };

  return (
    <ProjectContext.Provider value={{ projectState, updateProjectState }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => useContext(ProjectContext);
