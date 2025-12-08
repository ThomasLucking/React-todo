import { use } from 'react';
// 1. Import useState
import './App.css';
import { fetchTasks } from '/home/thomas/Desktop/React-todo/src/taskAPI/taskapi.ts';
import { TodoList } from './TodoList.tsx';

const fetchTasksPromise = fetchTasks();

export default function App() {
  const fetchedTasks = use(fetchTasksPromise);

  return (
    <>
      <div className="title-div">
        <h1 className="title-todo">TaskFlow</h1>
      </div>
      <TodoList initialTasks={fetchedTasks} />
    </>
  );
}
