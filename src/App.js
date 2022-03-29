import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import CreateProject from "./pages/createproject";
import Projects from "./pages/projects";
import Settings from "./pages/settings";
import Updates from "./pages/updates";
import Accounts from "./pages/Account";
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import Dashboard from "./components/Login/Dashboard"
import Reset from "./components/Login/Reset"


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
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/account" element={<Accounts />} />
      </Routes>
    </Router>
  );
}

export default App;
