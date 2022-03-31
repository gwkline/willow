import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index";
import Projects from "./pages/projects";
import Settings from "./pages/settings";
import Updates from "./pages/updates";
import Account from "./pages/accounts";
import Login from "./pages/login"
import Register from "./pages/register";
import Reset from "./pages/reset";


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/account" element={<Account />} />
        </Routes>
    </Router>
    <footer></footer>
    </>

  );
}

export default App;
