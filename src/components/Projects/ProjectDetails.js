import { useRef } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { v4 as uuid } from "uuid";
import NewTask from "./Tasks/NewTask";
import { useNavigate } from "react-router-dom";


function ProjectDetails(props) {
  const navigate = useNavigate();
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user] = useAuthState(auth);
  const messageInputRef = useRef();

  const [addingTask, isAddingTask] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const projectRef = ref(db, 'projects');

    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      const tasks = []
      for (let projectID in data) {
        //get list of tasks for this project
        if (projectID === props.currProj) {
          let thisTasks = data[projectID].tasks;
          for (let taskID in thisTasks) {
            tasks.push(thisTasks[taskID]);
          }
        }
      }
      setIsLoading(false);
      setLoadedTasks(tasks);
    });
  }, [props]);

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

  function addTaskHandler(props) {
    const unique_id = uuid();
    const db = getDatabase();
    props.key = unique_id;
    const taskToAdd = {
      key: props.key,
      name: props.name,
      description: props.description,
      assigned_to: props.assigned_to,
      status: props.status
    };
    console.log(Object.keys(props))
    set(ref(db, 'projects/' + props.currProj + '/tasks/' + unique_id), taskToAdd)
    isAddingTask(false);
    props.curTask = taskToAdd;


  }

  function addMessageHandler() {
    const message = messageInputRef.current.value;
    const db = getDatabase();
    props.messages.push([user.email, message]);
    set(ref(db, "projects/" + props.currProj + "/messages"), props.messages);
  }

  function addingTaskHandler() {
    isAddingTask(true);
  }

  return (
    <div className="proj-details">
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
        <button onClick={addingTaskHandler}>Add Task {'+'}</button>
      </div>
      <div>
        {addingTask && (
          <NewTask
            onAddTask={addTaskHandler}
            currProj={props.currProj}
          />
        )}
      </div>
      <hr></hr>
      <div>
        TaskList here
        <TaskList tasks={loadedTasks} />
      </div>

      <button className="btn btn--alt">Do Something</button>
      <button className="btn" onClick={closeModalHandler}>
        Close Modal
      </button>
    </div>
  )
}
export default ProjectDetails;
