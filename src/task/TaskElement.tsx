export default function TaskElement() {
  return (
    <fieldset className="fieldset-div">
      <legend className="task-legend">Task</legend>
      <div className="task-content">
        <input type="checkbox" className="task-checkbox" />
        <p>
          <span>hello</span>
          <time className="task-date" dateTime="06.5.2025">
            06.5.2025
          </time>
        </p>
        <button className="style-button delete-task-button">Delete</button>
      </div>
    </fieldset>
  );
}
