import { useRef } from "react";

function NewProjectForm(props) {
  const titleinputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleinputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const projectData = {
        title: enteredTitle,
        description: enteredDescription,
    };

    props.onAddProject(projectData);
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title">Project Title</label>
        <input type="text" required id="title" ref={titleinputRef} />
      </div>
      <div>
        <label htmlFor="description">Project Description</label>
        <input
          type="text"
          required
          id="description"
          ref={descriptionInputRef}
        />
      </div>
      <div>
        <button>Add Project</button>
      </div>
    </form>
  );
}

export default NewProjectForm;
