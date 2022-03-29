import React from "react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import name from "../../src/components/Login/Register";
import ProjectList from "../components/Projects/ProjectList";

function Account() {
    const [loadedProjects, setLoadedProjects] = useState([]);
  return (
    <div>
      <h1>This is the Account page</h1>
      <h2> Email: ../../src/comp</h2>
      <ProjectList projects={loadedProjects} />
    </div>
  );
};

export default Account;