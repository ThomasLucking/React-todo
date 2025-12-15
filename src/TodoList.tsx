import { useState } from 'react';
import type { SavedApiTask } from './taskAPI/taskapi';
import TaskElement from './task/TaskElement';
import TaskCreationForm from './form/TaskCreationForm';
import SortingMenuTodo from './task/SortingMenuTodo';

type Props = {
  initialTasks: SavedApiTask[];
};

export const TodoList = ({ initialTasks }: Props) => {
  const [tasks, setTasks] = useState<SavedApiTask[]>(initialTasks);
  const [primarySort, setPrimarySort] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  const handleAddTask = (newTask: SavedApiTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask: SavedApiTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  const handleSortingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    if (name === 'sort') {
      setPrimarySort(value);
    } else if (name === 'filter') {
      setStatusFilter(value);
    }
  };

  let displayedTasks = [...tasks];

  if (primarySort === 'sort-by-name') {
    displayedTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (primarySort === 'due-date') {
    displayedTasks.sort((a, b) => {
      const aDate = a.due_date;
      const bDate = b.due_date;

      if (aDate === null && bDate !== null) return 1;
      if (bDate === null && aDate !== null) return -1;
      if (aDate === null && bDate === null) return 0;

      const aTime = new Date(aDate as string).getTime();
      const bTime = new Date(bDate as string).getTime();

      return aTime - bTime;
    });
  }

  if (statusFilter === 'sort-by-undone-first') {
    displayedTasks = displayedTasks.filter((task) => !task.done);
  }

  if (statusFilter === 'sort-by-done-first') {
    displayedTasks = displayedTasks.filter((task) => task.done);
  }

  return (
    <div className="body-div">
      <TaskCreationForm onAddTask={handleAddTask} />
      <SortingMenuTodo onSortingChange={handleSortingChange} currentSort={primarySort} currentFilter={statusFilter} />
      {displayedTasks.map((task) => (
        <TaskElement
          key={task.id}
          {...task}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleDeleteTask}
        />
      ))}
    </div>
  );
};