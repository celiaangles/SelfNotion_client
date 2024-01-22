import React, { useContext, useEffect } from "react";
import CommentSection from "../components/CommentSection";

import UrgentProjectsList from "../components/UrgentProjectsList";
import { AuthContext } from "../context/auth.context";

const HomePage = () => {
  const { user } = useContext(AuthContext);

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

  if (!user) {
    return (
      <div>
        <p>User not authenticated. Please log in.</p>
      </div>
    );
  }

  const userId = user._id;

  return (
    <div>
      <h1>{formattedDate}</h1>
      <CommentSection userId={userId} />

      <UrgentProjectsList userId={userId} />
    </div>
  );
};

export default HomePage;
