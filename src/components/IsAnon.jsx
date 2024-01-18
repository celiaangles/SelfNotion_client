import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Navigate } from "react-router-dom";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  console.log("isLoggedIn:", isLoggedIn);
  console.log("isLoading:", isLoading);

  if (isLoading) return <p>Loading ...</p>;

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
}

export default IsAnon;
