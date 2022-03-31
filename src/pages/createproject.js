import { useNavigate } from "react-router-dom";
import React from "react";
import NewProjectForm from "../components/Projects/NewProjectForm";

function CreateProject() {
  const navigate = useNavigate();

  function addProjectHandler(projectData) {
    console.log(projectData);
    fetch("https://cis-454-group-2-default-rtdb.firebaseio.com/projects.json", {
      method: "POST",
      body: JSON.stringify(projectData),
    }).then(() => {
      navigate("/");
    });
  }

  return (
    <div>
      <h1 className="page-title">This is the Create Projects page</h1>
      <NewProjectForm onAddProject={addProjectHandler} />
    </div>
  );
}

export default CreateProject;
