import Task from "./Task";

function TaskList(props) {
  console.log(props.tasks)
  return (
    <ul>
      {props.tasks.map((task) => (
        <Task
          key={task.key}
          name={task.name}
          description={task.description}
          assigned_to={task.assigned_to}
          status={task.status}
        />
      ))}
    </ul>
  );
}

export default TaskList;
