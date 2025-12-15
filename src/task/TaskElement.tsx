import { useState } from 'react';
import { type SavedApiTask } from '../taskAPI/taskapi';
import { updateTask, deleteTasksViaAPI } from '../taskAPI/taskapi';

type TaskElementProps = SavedApiTask & {
  onTaskUpdate: (updatedTask: SavedApiTask) => void;
  onTaskDelete: (deletedTaskId: number) => void;
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
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [editedDueDate, setEditedDueDate] = useState(due_date);

  const [isEditing, setIsEditing] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedContent(e.target.value);
  };

  const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedDueDate(e.target.value);
  };

  const handleSaveEdits = async () => {
    if (
      editedTitle !== title ||
      editedContent !== content ||
      editedDueDate !== due_date
    ) {
      try {
        const updatedTaskData: SavedApiTask = {
          title: editedTitle,
          content: editedContent,
          due_date: editedDueDate,
          id,
          done,
        };
        const updatedTask = await updateTask(updatedTaskData);
        onTaskUpdate(updatedTask);
      } catch (error) {
        console.error('Failed to update task:', error);
        setEditedTitle(title);
        setEditedContent(content);
        setEditedDueDate(due_date);
      }
    }

    setIsEditing(false);
  };

  const handleCancelEdits = () => {
    setEditedTitle(title);
    setEditedContent(content);
    setEditedDueDate(due_date);
    setIsEditing(false);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleToggleDone = async () => {
    try {
      const updatedTaskData: SavedApiTask = {
        title: isEditing ? editedTitle : title,
        content: isEditing ? editedContent : content,
        due_date: isEditing ? editedDueDate : due_date,
        id,
        done: !done,
      };

      const updatedTask = await updateTask(updatedTaskData);

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
      {isEditing ? (
        <input
          type="text"
          className="task-title-input"
          value={editedTitle}
          onChange={handleTitleChange}
        />
      ) : (
        <legend className="task-legend" onClick={handleClick}>
          {editedTitle}
        </legend>
      )}

      <div className="task-content">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={done}
          onChange={handleToggleDone}
        />
        {isEditing ? (
          <input
            type="text"
            className="task-content-input"
            value={editedContent}
            onChange={handleContentChange}
          />
        ) : (
          <p onClick={handleClick}>
            <span>{editedContent}</span>
          </p>
        )}

        {isEditing ? (
          <input
            type="date"
            className="task-date-input"
            value={editedDueDate ?? ''}
            onChange={handleDueDateChange}
          />
        ) : (
          <time
            className="task-date"
            dateTime={due_date ?? undefined}
            onClick={handleClick}
          >
            {due_date}
          </time>
        )}

        <div className="task-actions">
          {isEditing && (
            <>
              <button
                className="style-button save-task-button"
                onClick={handleSaveEdits}
              >
                Save
              </button>
              <button
                className="style-button cancel-task-button"
                onClick={handleCancelEdits}
              >
                Cancel
              </button>
            </>
          )}
          <button
            className="style-button delete-task-button"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </fieldset>
  );
}
