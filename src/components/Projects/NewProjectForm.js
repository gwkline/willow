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

  function closeModalHandler() {
    props.onClose();
  }

  return (
    <div className="modal">
      <h2>Create New Project</h2>
      <hr></hr>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="title">Project Title: </label>
          <textarea rows="1" cols="30" type="text" required id="title" ref={titleinputRef} />
        </div>
        <br></br>
        <div>
          <label htmlFor="description">Project Description: </label>
          <textarea
            placeholder="Description"
            required
            rows="3"
            cols="30"
            id="description"
            ref={descriptionInputRef}
          />
        </div>
        <div>
          <button className="btn">Add Project</button>
          <button className="btn" onClick={closeModalHandler}>Cancel</button>
        </div>
      </form>
    </div>
    
  );
}

export default NewProjectForm;
