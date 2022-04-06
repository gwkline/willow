import { useState } from "react";
import { getDatabase, ref, update } from "firebase/database";

function Task(props) {

    function updateStatus(value) {
        const db = getDatabase();
        // change status of given task using value
    }


    return (
        <div className="task">
            <p>Name: {props.name}</p>
            <p>Desc: {props.description}</p>
            <p>Assigned To: {props.assigned_to}</p>
            <div className="statusSelect">
                <label htmlFor="status">Status:</label>
                <select className="statusDropdown" name="statusDropdown" id="status" onChange={updateStatus}>
                    <option value="new">New</option>
                    <option value="in progress">In Progress</option>
                    <option value="complete">Complete</option>
                </select>
            </div>
        </div>
    )
}
export default Task;