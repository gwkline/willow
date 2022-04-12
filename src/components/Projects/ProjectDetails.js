import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";
import { v4 as uuid } from "uuid";

function ProjectDetails(props) {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addingTask, isAddingTask] = useState(false);

  useEffect(() => {
    console.log("FIRING")
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
    //console.log(members);
    return members;
  }

  function closeModalHandler() {
    props.onClose();
  }

  function addTaskHandler() {
    console.log(props)
    //console.log(props.tasks)
    const unique_id = uuid();
    const db = getDatabase();
    const newTask = {
      key: unique_id,
      name: props.name,
      description: props.description,
      assigned_to: props.assigned_to,
      status: props.status
    };
    console.log(newTask);
    //set(ref(db, 'projects/' + props.currProj + '/tasks/' + unique_id), newTask);
    //props.tasks.push(newTask);
  }

  const assigneeOptions = ["ThisUser1", "ThisUser2"] //getProjMembers(props);

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
      <hr></hr>
      <div>
          <h2>Tasks</h2>
          <button onClick={addingTaskHandler}>Add Task {'+'}</button>
      </div>
      <div>
        {addingTask && (<form className="addTaskForm">
          <label>Name: </label>
          <input type="text"/>
          <label>Description: </label>
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
)}

export default ProjectDetails;
