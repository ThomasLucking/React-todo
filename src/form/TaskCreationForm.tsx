import { useState } from 'react';
import DeleteAllButton from './DeleteAllButton';
import { saveTasksViaAPI, type SavedApiTask } from '../taskAPI/taskapi';

export type TaskInput = {
  title: string;
  content: string;
  due_date: string | null;
  done: boolean;
};

export default function TaskCreationForm({
  onAddTask,
}: {
  onAddTask: (newtask: SavedApiTask) => void;
}) {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const addtask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a title');
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
      console.error('Error creating task:', error);
      alert('Failed to save task. Please try again.');
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
