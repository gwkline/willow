import { useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
} from "../../firebase";

function NewProjectForm(props) {
  const titleinputRef = useRef();
  const descriptionInputRef = useRef();
  const [user, loading] = useAuthState(auth);

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleinputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const projectData = {
        title: enteredTitle,
        description: enteredDescription,
        users: [user.uid],
        status: {
          new: [""],
          inProgress: [""],
          completed: [""]
        }
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
