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
      <h1>This is the Projects Page</h1>
      <ProjectList projects={loadedProjects} />
    </section>

  );
}

export default Projects;
