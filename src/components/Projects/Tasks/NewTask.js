import { useRef, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { v4 as uuid } from "uuid";

function NewTask(props) {
    const taskNameRef = useRef();
    const taskDescRef = useRef();
    const taskAssigneeRef = useRef();
    const taskStatusRef = useRef();
    const [addingTask, isAddingTask] = useState(false);


    function submitHandler(event) {
        event.preventDefault();

        const enteredTaskName = taskNameRef.current.value;
        const enteredTaskDesc = taskDescRef.current.value;
        const enteredTaskAssignee = taskAssigneeRef.current.value;
        const enteredTaskStatus = taskStatusRef.current.value;

        const unique_id = uuid();

        const taskDetails = {
            key: unique_id,
            name: enteredTaskName,
            description: enteredTaskDesc,
            assigned_to: enteredTaskAssignee,
            status: enteredTaskStatus,
            currProj: props.currProj,
        }

        props.onAddTask(taskDetails);
    }

    const assigneeOptions = getProjMembers(props);

    function getProjMembers(props) {
        const db = getDatabase();
        const userRef = ref(db, 'users');
        const members = [];

        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            for (const userObj in data) {
                let projectList = data[userObj].projects;
                if (Object.keys(projectList).includes(props.currProj)) {
                    members.push(data[userObj].email);
                }
            }
        })
        return members;
    }

    function closeAddTask() {
        isAddingTask(false);
        return () => {
            isAddingTask(true);
        }

    }

    return (
        <div className="addTaskForm">
            <label>Name: </label>
            <input type="text" ref={taskNameRef} />
            <label>Description: </label>
            <input type="text" ref={taskDescRef} />
            <label>Assigned To:</label>
            <select ref={taskAssigneeRef} name="selectAssignee">
                {assigneeOptions.map(item => {
                    return (<option key={item} value={item}>{item}</option>);
                })}
            </select>
            <label>Status: </label>
            <select name="selectStatus" ref={taskStatusRef}>
                <option default value="new">New</option>
                <option value="in_progress">In Progress</option>
                <option value="complete">Completed</option>
            </select>
            <button onClick={submitHandler}>Add</button>
            <button onClick={closeAddTask}>Cancel</button>
        </div>
    );
}

export default NewTask;
