export default function TaskElement() {
  return (
      <div className="TaskElement-div">
        <fieldset className="fieldset-div">
          <legend className="task-legend">Task</legend>
          <div className="task-content">
            <input type="checkbox" className="task-checkbox" />
            <span>Math Homework</span>
            <span className="task-date">06.5.2025</span>
            <button className="style-button delete-task-button">Delete</button>
          </div>
        </fieldset>
      </div>
  );
}
