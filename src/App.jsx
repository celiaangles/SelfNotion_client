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

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/projects" element={<ProjectListPage />} />
        <Route
          exact
          path="/projects/:projectId"
          element={<ProjectDetailsPage />}
        />
        <Route
          exact
          path="/projects/edit/:projectId"
          element={<EditProjectPage />}
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
      </Routes>
    </div>
  );
}

export default App;
