import { use, useState } from 'react';
import './App.css';
import { fetchTasks } from './taskAPI/taskapi.ts';
import { TodoList } from './TodoList.tsx';
import ErrorManagementComponent from './ErrorManagement/ErrorManagement.tsx';
import { ErrorBoundary } from 'react-error-boundary';
const fetchTasksPromise = fetchTasks();

export default function App() {
  const fetchedTasks = use(fetchTasksPromise);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <>
      <ErrorBoundary
        fallback={
          <ErrorManagementComponent
            message="Critial Error Occurred. Please try reloading the app."
            onDismiss={() => setErrorMessage(null)}
          />
        }
      ></ErrorBoundary>
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
