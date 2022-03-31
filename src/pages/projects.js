import { useState, useEffect } from "react";

import React from "react";
import ProjectList from "../components/Projects/ProjectList";

function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProjects, setLoadedProjects] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://cis-454-group-2-default-rtdb.firebaseio.com/projects.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
    
        const projects =[]
        for (const key in data) {
          console.log(key)
          const project = {
            id: key,
            ...data[key]
          };

          projects.push(project);
        }

        setIsLoading(false);
        setLoadedProjects(projects);
      });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <h1 className="page-title">Projects</h1>
      <button className="create-proj-btn">+ Create New Project</button>
      <hr></hr>
      <ProjectList projects={loadedProjects} />
    </section>

  );
}

export default Projects;
