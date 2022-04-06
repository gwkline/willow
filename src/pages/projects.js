import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
} from "../firebase";
import React from "react";
import NewProjectForm from "../components/Projects/NewProjectForm";
import ProjectList from "../components/Projects/ProjectList";
import Backdrop from "../components/Backdrop";


function Projects() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedProjects, setLoadedProjects] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  let userProjectArray = [];

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const projectRef = ref(db, 'projects');
    const userRef = ref(db, 'users');

    //Check if the current user's project list has changed
    //if so, add it to the projects array
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      for (let userID in data) {
        if (userID === user.uid) {
          for (let projectID in data[userID].projects) {
            userProjectArray.push(data[userID].projects[projectID]);
          }
        }
      }
    })

    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data); //gives project list
      const projects = []
      for (const projectID in data) {
        if (userProjectArray.includes(projectID)) {
          const project = {
            id: projectID,
            ...data[projectID]
          };

          projects.push(project);
        }
      }

      setIsLoading(false);
      setLoadedProjects(projects);
      navigate('/projects/')
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
    set(ref(db, 'projects/' + projectData.key), projectData);
    set(ref(db, 'users/' + projectData.owner + '/projects/' + projectData.key), projectData.key)
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
            onClose={closeModalHandler} />
        )}
        {modalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </div>
    </>
  );
}

export default Projects;
