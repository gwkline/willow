import { useRef } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function ProjectDetails(props) {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);
  const messageInputRef = useRef();

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const projectRef = ref(db, "projects");
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      const tasks = [];
      for (const id in data) {
        if (id === props.currProj) {
          const taskList = data[id].tasks;
          console.log("ids match");
          for (const t in taskList) {
            console.log(taskList[t]);
            tasks.push(taskList[t]);
          }
        }
        break;
      }
      setLoadedTasks(tasks);
      setIsLoading(false);
    });
  }, [props.currProj]);
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  function closeModalHandler() {
    props.onClose();
  }

  function addMessageHandler() {
    const message = messageInputRef.current.value;
    const db = getDatabase();
    props.messages.push([user.email, message]);
    set(ref(db, "projects/" + props.currProj + "/messages"), props.messages);
  }

  function addTaskHandler(taskDetails) {
    const db = getDatabase();
    set(ref(db, "projects/" + props.currProj + "/tasks"), taskDetails);
    const newTask = {
      name: taskDetails.name,
      description: taskDetails.description,
      assigned_to: taskDetails.assigned_to,
      status: taskDetails.status,
    };
    props.tasks.push(newTask);
  }

  return (
    <div className="modal">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <h2>Messages</h2>
      <ol>
        {props.messages.map((elm) => (
          <p>
            {elm[0]}...{elm[1]}
          </p>
        ))}
      </ol>
      <div>
        <textarea
          placeholder="Message"
          rows="3"
          cols="30"
          id="message"
          ref={messageInputRef}
        />
      </div>
      <button className="btn" onClick={addMessageHandler}>
        Add Message
      </button>
      <hr></hr>
      <div>
        <h2>Tasks</h2>
        <button onClick={addTaskHandler}>Add Task {"+"}</button>
      </div>
      <div>
        <TaskList tasks={loadedTasks} />
      </div>

      <button className="btn btn--alt">Do Something</button>
      <button className="btn" onClick={closeModalHandler}>
        Close Modal
      </button>
    </div>
  );
}

export default ProjectDetails;
