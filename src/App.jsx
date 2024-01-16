import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";

import NuvolListPage from "./pages/NuvolListPage";
import NuvolDetailsPage from "./pages/NuvolDetailsPage";
import EditNuvolPage from "./pages/EditNuvolPage";

import ObjectiuDetailsPage from "./pages/ObjectiuDetailsPage";
import EditObjectiuPage from "./pages/EditObjectiuPage";

import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/projects"
          element={
            <IsPrivate>
              {" "}
              <ProjectListPage />{" "}
            </IsPrivate>
          }
        />
        <Route
          path="/projects/:projectId"
          element={
            <IsPrivate>
              <ProjectDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/projects/edit/:projectId"
          element={
            <IsPrivate>
              <EditProjectPage />
            </IsPrivate>
          }
        />

        <Route exact path="/nuvols" element={<NuvolListPage />} />
        <Route exact path="/nuvols/:nuvolId" element={<NuvolDetailsPage />} />
        <Route exact path="/nuvols/edit/:nuvolId" element={<EditNuvolPage />} />

        <Route
          exact
          path="/objectius/:objectiuId"
          element={<ObjectiuDetailsPage />}
        />

        <Route
          exact
          path="/objectius/edit/:objectiuId"
          element={<EditObjectiuPage />}
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
