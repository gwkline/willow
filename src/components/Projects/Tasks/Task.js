function Task(props) {

    return (
        <div className="task">
            <p>{props.name}</p>
            <p>{props.description}</p>
            <div className="statusSelect">
                <label htmlFor="assignee">Assigned To:</label>
                <select className="statusDropdown" name="assigneeDropdown" id="assignee">
                    <option></option>
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