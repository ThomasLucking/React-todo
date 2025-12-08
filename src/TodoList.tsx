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

  const handleAddTask = (newTask: SavedApiTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const handleTaskUpdate = (updatedTask: SavedApiTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
    );
  };

  const handleDeleteTask = (taskId: number | string) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
  };

  return (
    <div className="body-div">
      <TaskCreationForm onAddTask={handleAddTask} />
      <SortingMenuTodo />
      {tasks.map((task) => (
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
