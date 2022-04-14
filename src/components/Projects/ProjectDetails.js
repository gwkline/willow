import { useRef } from "react";
import { getDatabase, ref, set, onValue, get } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { v4 as uuid } from "uuid";
import NewTask from "./Tasks/NewTask";

function ProjectDetails(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [addingTask, isAddingTask] = useState(false);
  const [user] = useAuthState(auth);
  const messageInputRef = useRef();
  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  useEffect(() => {
    console.log("projectDetails.js: useEffect");
    setIsLoading(true);
    const db = getDatabase();

    const taskRef = ref(db, 'projects/' + props.currProj);

    onValue(taskRef, (snapshot) => {
      const data = snapshot.val();
      const tasks = [];
      for (const taskID in data.tasks) {

        if (taskID !== "0") {
          const task = {
            key: taskID,
            ...data.tasks[taskID]
          };

          tasks.push(task);
        }
      }

      setLoadedTasks(tasks);
      setIsLoading(false);
    });
  }, [user, props.currProj]);

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

    if (props.name === "" || props.description === "" || props.assigned_to === "" || props.status === "") {
      alert("Please fill out all fields");
      return;
    }


    const unique_id = uuid();
    const db = getDatabase();
    props.key = unique_id;
    const taskToAdd = {
      key: props.key,
      name: props.name,
      description: props.description,
      assigned_to: props.assigned_to,
      status: props.status,
    };

    set(ref(db, 'projects/' + props.currProj + '/tasks/' + unique_id), taskToAdd)
    isAddingTask(false);
    props.curTask = taskToAdd;

    get(ref(db, 'projects/' + props.currProj + '/tasks/')).then((snapshot) => {
      const data = snapshot.val();
      for (let task in data) {
        if (task === "0" || task === 0) {
          console.log("FOUND ONE")
          set(ref(db, 'projects/' + props.currProj + '/tasks/' + task), null)
        }
      }
    });
  }

  function addMessageHandler() {
    const message = messageInputRef.current.value;
    const db = getDatabase();
    props.messages.push([user.email, message]);
    set(ref(db, "projects/" + props.currProj + "/messages"), props.messages);
  }

  function changeDetailsHandler() {
    const newTitle = titleInputRef.current.value;
    const newDescription = descriptionInputRef.current.value;
    if (newTitle === "" || newDescription === "") {
      alert("Please fill out all fields");
      return;
    }
    const db = getDatabase();
    set(ref(db, "projects/" + props.currProj + "/title"), newTitle);
    set(ref(db, "projects/" + props.currProj + "/description"), newDescription);
  }

  function addingTaskHandler() {
    isAddingTask(true);
  }

  return (
    <div className="proj-details">
      <div className="project_header">
        <div>
          <h1>{props.title}</h1>
          <p>{props.description}</p>
        </div>
        <div>
          <div>
            <textarea
              placeholder="New Title"
              rows="1"
              cols="30"
              id="message"
              ref={titleInputRef}
            />
          </div>
          <div>
            <textarea
              placeholder="New Description"
              rows="3"
              cols="50"
              id="message"
              ref={descriptionInputRef}
            />
          </div>
          <button className="btn" onClick={changeDetailsHandler}>
            Change Project Details
          </button>
        </div>
      </div>
      <div className="project_messages">
        <div>
          <h2>Messages</h2>
          <div className="message_list">
            {props.messages.map((elm) => (
              <p>
                {elm[0]}: {elm[1]}
              </p>
            ))}
          </div>
          <div>
            <textarea
              placeholder="Message"
              rows="3"
              cols="50"
              id="message"
              ref={messageInputRef}
            />
          </div>
          <button className="btn" onClick={addMessageHandler}>
            Add Message
          </button>
        </div>
      </div>
      <div className="project_tasks">
        <div>
          <h2>Tasks</h2>
          <button onClick={addingTaskHandler}>Add Task {"+"}</button>
        </div>
        <div>
          {addingTask && (
            <NewTask onAddTask={addTaskHandler} currProj={props.currProj} />
          )}
        </div>
        <div>
          <TaskList tasks={loadedTasks} />
        </div>
        <button className="btn" onClick={closeModalHandler}>
          Close Modal
        </button>
      </div>
    </div>
  );
}
export default ProjectDetails;
