import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import CreateProject from "./pages/createproject";
import Projects from "./pages/projects";
import Settings from "./pages/settings";
import Updates from "./pages/updates";
import Login from "./components/Login/Login"
import Register from "./components/Login/Register";
import Reset from "./components/Login/Reset";
import Dashboard from "./components/Login/Dashboard";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/index" element={<Home />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/settings" element={<Settings />} />
          <Route exact path="/login" component={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router> 
      <footer></footer>
    </>
       
  );
}

export default App;
