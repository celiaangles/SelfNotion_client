import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOutUser();
    navigate("/login");
  };

  return (
    <nav>
      {isLoggedIn && (
        <>
          <Link to="/home">
            <button>Home</button>
          </Link>
          <Link to="/projects">
            <button>Projects</button>
          </Link>

          <Link to="/nuvols">
            <button>Nuvols</button>
          </Link>

          <button onClick={handleLogout}>Logout</button>
          <span>{user && user.name}</span>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Link to="/signup">
            <button>Sign Up</button>
          </Link>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
