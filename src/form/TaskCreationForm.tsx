import { useState } from 'react';
import DeleteAllButton from './DeleteAllButton';
import { saveTasksViaAPI } from '../taskAPI/taskapi';
import { useTaskStore, useError } from '../store/useTasksStore'; 

export type TaskInput = {
  title: string;
  content: string;
  due_date: string | null;
  done: boolean;
};

export default function TaskCreationForm() {
  const addTask = useTaskStore((state) => state.addTask);
  const { setErrorMessage } = useError();

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');
  const [titleError, setTitleError] = useState<string | null>(null);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setTitleError(null);

    if (!title.trim()) {
      setTitleError('task title cannot be empty.');
      return;
    }

    const taskToSend: TaskInput = {
      title,
      content,
      due_date: dueDate || null,
      done: false,
    };

    try {
      const savedTask = await saveTasksViaAPI(taskToSend);
      addTask(savedTask);

      setTitle('');
      setContent('');
      setDueDate('');
    } catch (error) {
      setErrorMessage('Failed to add and save the task. Please try again.');
      console.error('Error saving task:', error);
    }
  };

  return (
    <form className="ButtonStructDiv" onSubmit={handleAddTask}>
      <input
        className="title style-button"
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {titleError && <p className="error-message">{titleError}</p>}

      <input
        className="content style-button"
        type="text"
        placeholder="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="date style-button"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit" className="Add-button style-button">
        Add
      </button>

      
      <DeleteAllButton />
    </form>
  );
}
