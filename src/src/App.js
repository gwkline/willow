import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import CreateProject from "./pages/createproject";
import Projects from "./pages/projects";
import Settings from "./pages/settings";
import Updates from "./pages/updates";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createproject" element={<CreateProject />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/updates" element={<Updates />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
