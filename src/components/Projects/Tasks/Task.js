import { useRef } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

function Task(props) {
    const taskAssigneeRef = useRef();

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



    return (
        <div className="task">
            <p>{props.name}</p>
            <p>{props.description}</p>

            <div className="statusSelect">
                <label>Assigned To:</label>
                <select className="statusDropdown" ref={taskAssigneeRef} name="assigneeDropdown" id="assignee">
                    {assigneeOptions.map(item => {
                        return (<option key={item} value={item}>{item}</option>);
                    })}
                </select>
            </div>

            <div className="statusSelect">
                <label htmlFor="status">Status:</label>
                <select className="statusDropdown" name="statusDropdown" id="status">
                    <option value="new">New</option>
                    <option value="in_progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
        </div>
    )
}
export default Task;