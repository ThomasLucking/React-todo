import { use, useEffect, cache } from 'react';
import './App.css';
import { fetchTasks } from './taskAPI/taskapi.ts';
import { TodoList } from './task/TodoList.tsx';
import ErrorManagementComponent from './ErrorManagement/ErrorManagement.tsx';
import { ErrorBoundary } from 'react-error-boundary';
import { useTaskStore, useError } from './store/useTasksStore.ts';

const getFetchPromise = cache(fetchTasks);
const tasksPromise = getFetchPromise();

export default function App() {
  const fetchedTasks = use(tasksPromise);

  const tasks = useTaskStore((state) => state.tasks);
  const initializeTasks = useTaskStore((state) => state.initializeTasks);
  const { errorMessage, setErrorMessage } = useError();

  useEffect(() => {
    if (tasks.length === 0 && fetchedTasks?.length > 0) {
      initializeTasks(fetchedTasks);
    }
  }, [fetchedTasks, initializeTasks, tasks.length]);

  return (
    <>
      <ErrorBoundary
        fallback={
          <ErrorManagementComponent
            message="Critical Error Occurred."
            onDismiss={() => {window.location.reload()}}
          />
        }
      >
        {errorMessage && (
          <ErrorManagementComponent
            message={errorMessage}
            onDismiss={() => setErrorMessage(null)}
          />
        )}
        <div className="title-div">
          <h1 className="title-todo">TaskFlow</h1>
        </div>
        <TodoList />
      </ErrorBoundary>
    </>
  );
}
