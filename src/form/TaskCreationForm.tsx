import { useState } from 'react';
import DeleteAllButton from './DeleteAllButton';
import { saveTasksViaAPI, type SavedApiTask } from '../taskAPI/taskapi';

export type TaskInput = {
  title: string;
  content: string;
  due_date: string | null;
  done: boolean;
};

type TaskCreationFormProps = {
  onAddTask: (newtask: SavedApiTask) => void;
  setErrorMessage: (message: string | null) => void;
};

export default function TaskCreationForm({
  onAddTask,
  setErrorMessage,
}: TaskCreationFormProps) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const [titleError, setTitleError] = useState<string | null>(null);

  const addtask = async (e: React.FormEvent) => {
    e.preventDefault();

    setTitleError(null);

    if (!title.trim()) {
      setTitleError('task title cannot be empty.');
      return;
    }

    const taskToSend: TaskInput = {
      title: title,
      content: content,
      due_date: dueDate || null,
      done: false,
    };

    try {
      const savedTask = await saveTasksViaAPI(taskToSend);
      onAddTask(savedTask);

      setTitle('');
      setContent('');
      setDueDate('');
    } catch (error) {
      setErrorMessage('Failed to add and save the task. Please try again.');
      console.error('Error saving task:', error);
    }
  };

  return (
    <form className="ButtonStructDiv" onSubmit={addtask}>
      <input
        className="title style-button"
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      {titleError && <p className="error-message">{titleError}</p>}
      <input
        className="content style-button"
        type="text"
        placeholder="content"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
      <input
        className="date style-button"
        type="date"
        value={dueDate}
        onChange={(e) => {
          setDueDate(e.target.value);
        }}
      />
      <button type="submit" className="Add-button style-button">
        Add
      </button>
      <DeleteAllButton />
    </form>
  );
}
