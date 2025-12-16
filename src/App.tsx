import { use, useState } from 'react';
import './App.css';
import { fetchTasks } from './taskAPI/taskapi.ts';
import { TodoList } from './TodoList.tsx';
import ErrorManagementComponent from './ErrorManagement/ErrorManagement.tsx';
const fetchTasksPromise = fetchTasks();

export default function App() {
  const fetchedTasks = use(fetchTasksPromise);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      {errorMessage && (
        <ErrorManagementComponent
          message={errorMessage}
          onDismiss={() => setErrorMessage(null)}
        />
      )}
      <div className="title-div">
        <h1 className="title-todo">TaskFlow</h1>
      </div>
      <TodoList initialTasks={fetchedTasks} setErrorMessage={setErrorMessage} />
    </>
  );
}
