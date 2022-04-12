import { useRef } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { v4 as uuid } from "uuid";

function ProjectDetails(props) {
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
      const tasks = [];
      for (const id in data) {
        if (id === props.currProj) {
          const taskList = data[id].tasks;
          for (const task in taskList) {
            tasks.push(taskList[task]);
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

  function getProjMembers(props) {
    const db = getDatabase();
    const projectRef = ref(db, 'projects');
    const userRef = ref(db, 'users');
    const members = [];
    onValue(projectRef, (snapshot) => {
      const data = snapshot.val();
      //console.log(data); //gives project list
      for (const projectID in data) {
        if (projectID === props.currProj) {
          onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            for (let userID in data) {
              for (let p in data[userID].projects) {
                if (p === projectID) {
                  members.push(userID);
                }
                break;
              }
            }
          })
        }
        break;
      }
    })
    console.log(members);
    return members;
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

    function addTaskHandler(taskProp) {
      const unique_id = uuid();
      const db = getDatabase();
      const newTask = {
        key: unique_id,
        name: "taskProp.name",
        description: "taskProp.description",
        assigned_to: "taskProp.assigned_to",
        status: "taskProp.status"
      };
      set(ref(db, 'projects/' + props.currProj + '/tasks/' + unique_id), newTask);
      if (props.tasks === undefined) {
        props.tasks = [];
      }
      else {
        console.log(props.tasks)
      }
      props.tasks.push(newTask);
    }

    const assigneeOptions = getProjMembers(props);

    function addingTaskHandler() {
      isAddingTask(true);
    }

    function closeAddTask() {
      isAddingTask(false);
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
          {addingTask && (<form className="addTaskForm">
            <label>Name: </label>
            <input type="text"/>
            <label>Assigned To:</label>
            <select name="selectAssignee">
              {assigneeOptions.map(item => {
                return (<option key={item} value={item}>{item}</option>);
              })}
            </select>
            <label>Status: </label>
            <select name="selectStatus">
              <option default value="new">New</option>
              <option value="in_progress">In Progress</option>
              <option value="complete">Completed</option>
            </select>
            <button onClick={addTaskHandler}>Add</button>
            <button onClick={closeAddTask}>Cancel</button>
          </form>)}
        </div>
        <hr></hr>
        <div>
          TaskList here
            <TaskList tasks={loadedTasks}/>
        </div>

      <button className="btn btn--alt">Do Something</button>
      <button className="btn" onClick={closeModalHandler}>
        Close Modal
      </button>
    </div>
  );
}

export default ProjectDetails;
