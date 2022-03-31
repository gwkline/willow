import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import React from "react";
import NewProjectForm from "../components/Projects/NewProjectForm";
import ProjectList from "../components/Projects/ProjectList";
import Backdrop from "../components/Backdrop";


function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const projectRef = ref(db, 'projects');
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
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

  function addProjectHandler(projectData) {
    console.log(projectData);
    const db = getDatabase();
    set(ref(db, 'projects/' + projectData.title), projectData);
    navigate("/projects");
    closeModalHandler()
  }
  
  
  function viewHandler() {
    setModalIsOpen(true);
  }

  function closeModalHandler() {
    setModalIsOpen(false);
  }

  return (
    <>
      <section>
        <h1 className="page-title">Projects</h1>
        <button className="create-proj-btn" onClick={viewHandler}>+ Create New Project</button>
        <hr></hr>
        <ProjectList projects={loadedProjects} />
      </section>
      <div>
        {modalIsOpen && (
          <NewProjectForm
          onAddProject={addProjectHandler}
          onClose={closeModalHandler}/>
        )}
        {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </div>
    </>
  );
}

export default Projects;
