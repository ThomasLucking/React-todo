import { useState } from 'react';
import type { SavedApiTask } from './taskAPI/taskapi';
import TaskElement from './task/TaskElement';
import TaskCreationForm from './form/TaskCreationForm';
import SortingMenuTodo from './task/SortingMenuTodo';
import { SORT_OPTIONS, FILTER_OPTIONS } from './constants/constants';

type Props = {
  initialTasks: SavedApiTask[];
  setErrorMessage: (message: string | null) => void;
};

export const TodoList = ({ initialTasks, setErrorMessage }: Props) => {
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

  if (primarySort === SORT_OPTIONS.BY_NAME) {
    displayedTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  if (primarySort === SORT_OPTIONS.BY_DUE_DATE) {
    displayedTasks.sort((a, b) => {
      const aDate = a.due_date;
      const bDate = b.due_date;

      if (aDate === null && bDate !== null) return 1;
      if (bDate === null && aDate !== null) return -1;
      if (aDate === null && bDate === null) return 0;

      const aTime = new Date(aDate as string).getTime();
      const bTime = new Date(bDate as string).getTime();

      const aIsInvalid = isNaN(aTime);
      const bIsInvalid = isNaN(bTime);

      if (aIsInvalid && !bIsInvalid) return 1;
      if (bIsInvalid && !aIsInvalid) return -1;
      if (aIsInvalid && bIsInvalid) return 0;

      return aTime - bTime;
    });
  }

  if (statusFilter === FILTER_OPTIONS.UNDONE) {
    displayedTasks = displayedTasks.filter((task) => !task.done);
  }

  if (statusFilter === FILTER_OPTIONS.DONE) {
    displayedTasks = displayedTasks.filter((task) => task.done);
  }

  return (
    <div className="body-div">
      <TaskCreationForm
        onAddTask={handleAddTask}
        setErrorMessage={setErrorMessage}
      />
      <SortingMenuTodo
        onSortingChange={handleSortingChange}
        currentSort={primarySort}
        currentFilter={statusFilter}
      />
      {displayedTasks.map((task) => (
        <TaskElement
          key={task.id}
          {...task}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleDeleteTask}
          setErrorMessage={setErrorMessage}
        />
      ))}
    </div>
  );
};
