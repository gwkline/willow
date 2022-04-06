import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue, update } from "firebase/database";
import {getAuth} from "firebase/auth";
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
    let user = getAuth().currentUser;
    const db = getDatabase();

    
    let userProjects = []

    const userRef = ref(db, 'users/' + user.uid + '/projects');
    onValue(userRef, (snapshot) => {
      const projectList = snapshot.val();
      userProjects = projectList;
    });

    console.log(userProjects);


    const projectRef = ref(db, 'projects');
    onValue(projectRef, (snapshot) => {
      const projectList = snapshot.val();
        const projects =[]
        for (let project in projectList) {
          if (userProjects.includes(project)) {
            let projectObject = {
              id: project,
              ...projectList[project]
            }
            projects.push(projectObject);
          }
        }

        setIsLoading(false);
        setLoadedProjects(projects);
    });
  }, [navigate]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function addProjectHandler(projectData) {
    const db = getDatabase();
    set(ref(db, 'projects/' + projectData.key), projectData)
    .then(function(result) {
      let thisRef = ref(db, 'projects/' + projectData.key)
      let updates = {}
      updates['/users/' + projectData.owner + '/projects/'] = thisRef.key;
      update(ref(db, 'users/' + projectData.owner), updates);

    }).catch(function(error) {
      console.log(error);
    });

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
