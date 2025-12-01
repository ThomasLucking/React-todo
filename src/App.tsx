import './App.css';

import TaskElement from './task/TaskElement.tsx';
import SortingMenuTodo from './task/SortingMenuTodo.tsx';
import TaskCreationForm from './form/TaskCreationForm.tsx';
export default function TodoApp() {
  return (
    <>
      <div className="title-div">
        <h1 className="title-todo">TaskFlow</h1>
      </div>
      <div className="body-div">
        <TaskCreationForm />

        <SortingMenuTodo />
        <TaskElement />
      </div>
    </>
  );
}
