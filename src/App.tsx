import './App.css';

import TaskElement from './TaskElement.tsx';
import SortingMenuTodo from './SortingMenuTodo.tsx';
import TaskCreationButtons from './TaskCreationButtons.tsx';

export default function TodoApp() {
  return (
    <>
      <div className="title-div">
        <h1 className="title-todo">TaskFlow</h1>
      </div>
      <div className="body-div">
        <TaskCreationButtons />
        <SortingMenuTodo />
        <TaskElement />
      </div>
    </>
  );
}
