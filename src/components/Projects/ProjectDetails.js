import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";
import { v4 as uuid } from "uuid";

function ProjectDetails(props) {
  const [loadedTasks, setLoadedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
          for (const t in taskList) {
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


    function addTaskHandler(taskProp) {
      const unique_id = uuid();
      const db = getDatabase();
      let taskList = ref(db, 'projects/' + props.currProj + '/tasks')
      console.log(taskList);
      
      // const newTask = {
      //   name: taskProp.name,
      //   description: taskProp.description,
      //   assigned_to: taskProp.assigned_to,
      //   status: taskProp.status
      // };
      const newTask = {
        key: unique_id,
        name: "taskProp.name",
        description: "taskProp.description",
        assigned_to: "taskProp.assigned_to",
        status: "taskProp.status"
      };
      set(ref(db, 'projects/' + props.currProj + '/tasks/' + unique_id), newTask);
      props.tasks.push(newTask);
    }
  
    return (
      <div className="modal">
        <h1>{props.title}</h1>
        <p>{props.description}</p>
        <hr></hr>
        <div>
            <h2>Tasks</h2>
            <button onClick={addTaskHandler}>Add Task {'+'}</button>
        </div>
        <div>
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
