import React, { useContext } from "react";
import CommentSection from "../components/CommentSection";

import UrgentProjectsList from "../components/UrgentProjectsList";
import { AuthContext } from "../context/auth.context";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div>
        <h1>Home Page</h1>
        <p>User not authenticated. Please log in.</p>
      </div>
    );
  }

  const userId = user._id;

  return (
    <div>
      <h1>Home Page</h1>
      <CommentSection userId={userId} />

      <UrgentProjectsList userId={userId} />
    </div>
  );
};

export default HomePage;
