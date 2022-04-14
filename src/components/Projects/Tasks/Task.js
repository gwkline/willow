import { useRef } from "react";
import { getDatabase, ref, onValue, set, get } from "firebase/database";

function Task(props) {
    const taskAssigneeRef = useRef();
    const taskStatusRef = useRef();

    const assigneeOptions = getProjMembers(props);

    function getProjMembers(props) {
        let db = getDatabase();
        let userRef = ref(db, 'users');
        let members = [];
        //let taskKey = props.key
        let thisProj = null
        let projectRef = ref(db, 'projects');

        onValue(projectRef, (snapshot) => {
            const data = snapshot.val();
            for (let projectID in data) {
                if (data[projectID].tasks) {
                    if (Object.keys(data[projectID].tasks).includes(props.taskKey)) {
                        thisProj = projectID
                    }
                }

            }
        })



        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            for (const userObj in data) {
                let projectList = data[userObj].projects;
                if (Object.keys(projectList).includes(thisProj)) {
                    members.push(data[userObj].email);
                }
            }
        })
        return members;
    }

    //deletes the task passed in props
    function deleteTask() {
        let db = getDatabase();
        let projectRef = ref(db, 'projects');
        get(projectRef).then((snapshot) => {
            const data = snapshot.val();
            for (let projectID in data) {
                if (data[projectID].tasks) {
                    if (Object.keys(data[projectID].tasks).includes(props.taskKey)) {
                        set(ref(db, 'projects/' + projectID + '/tasks/' + props.taskKey), null);
                    }
                }
            }
        })
    }

    //updates the task passed in props
    function updateTask() {
        let db = getDatabase();
        let projectRef = ref(db, 'projects');
        get(projectRef).then((snapshot) => {
            const data = snapshot.val();
            for (let projectID in data) {
                if (data[projectID].tasks) {
                    if (Object.keys(data[projectID].tasks).includes(props.taskKey)) {
                        let newTask = {
                            key: props.taskKey,
                            name: props.name,
                            description: props.description,
                            assigned_to: taskAssigneeRef.current.value,
                            status: taskStatusRef.current.value,
                        }
                        set(ref(db, 'projects/' + projectID + '/tasks/' + props.taskKey), newTask);
                    }
                }
            }
        })
    }

    return (
        <div className="task">
            <p>{props.name}</p>
            <p>{props.description}</p>
            <div className="statusSelect">

                <select className="statusDropdown" ref={taskAssigneeRef} name="assigneeDropdown" id="assignee">
                    {assigneeOptions.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                    })}
                </select>

            </div>
            <div className="statusSelect">
                <select defaultValue={props.status} ref={taskStatusRef} className="statusDropdown" name="statusDropdown" id="status">
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
            <div style={{ display: 'flex' }}>
                <button onClick={deleteTask}>X</button>
                <button onClick={updateTask}>⟳</button>
            </div>
        </div>
    )
}
export default Task;