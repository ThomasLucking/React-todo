import { type SavedApiTask } from '../taskAPI/taskapi';
import { updateTaskStateViaAPI } from '../taskAPI/taskapi';
import { deleteTasksViaAPI } from '../taskAPI/taskapi';

type TaskElementProps = SavedApiTask & {
  onTaskUpdate: (updatedTask: SavedApiTask) => void;
  onTaskDelete: (deletedTaskId: number | string) => void;
};

export default function TaskElement({
  title,
  content,
  due_date,
  done,
  id,
  onTaskUpdate,
  onTaskDelete,
}: TaskElementProps) {
  const handleToggleDone = async () => {
    try {
      const updatedTask = await updateTaskStateViaAPI(
        { title, content, due_date, done, id },
        !done,
      );
      onTaskUpdate(updatedTask);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTasksViaAPI(id);
      onTaskDelete(id);
    } catch (error) {
      console.error('failed to delete task', error);
    }
  };

  return (
    <fieldset className="fieldset-div">
      <legend className="task-legend">{title}</legend>
      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={done}
          onChange={handleToggleDone}
        />
        <p>
          <span>{content}</span>
          <time className="task-date" dateTime={due_date ?? undefined}>
            {due_date}
          </time>
        </p>
        <button
          className="style-button delete-task-button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </fieldset>
  );
}
