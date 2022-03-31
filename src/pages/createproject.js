import { useNavigate } from "react-router-dom";
import React from "react";
import NewProjectForm from "../components/Projects/NewProjectForm";
import { getDatabase, ref, set } from "firebase/database";

function CreateProject() {
  function addProjectHandler(projectData) {
    console.log(projectData);
    const db = getDatabase();
    set(ref(db, 'projects/' + projectData.title), projectData);
  }

  return (
    <div>
      <h1 className="page-title">This is the Create Projects page</h1>
      <NewProjectForm onAddProject={addProjectHandler} />
    </div>
  );
}

export default CreateProject;
