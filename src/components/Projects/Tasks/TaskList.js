import Task from "./Task";

function TaskList(props) {
  return (
    <>
      <div className="tasklist-header">
        <h3>Name:</h3>
        <h3>Description:</h3>
        <h3>Assignee:</h3>
        <h3>Status:</h3>
      </div>

      <ul className="tasklist">
        {props.tasks.map((task) => (
          <Task
            taskKey={task.key}
            name={task.name}
            description={task.description}
            assigned_to={task.assigned_to}
            status={task.status}
          />
        ))}
      </ul>
    </>

  );
}

export default TaskList;
