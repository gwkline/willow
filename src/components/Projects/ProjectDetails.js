import { getDatabase, ref, set, onValue } from "firebase/database";
import { useState, useEffect } from "react";
import TaskList from "./Tasks/TaskList";

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
  }, []);
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

  function addTaskHandler(taskDetails) {
    const db = getDatabase();
    set(ref(db, 'projects/' + props.currProj + '/tasks'), taskDetails);
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
