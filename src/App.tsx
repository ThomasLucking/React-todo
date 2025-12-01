import './App.css';

import TaskElement from './TaskElement.tsx';
import SortingButton from './SortingButton.tsx';
import ButtonStruct from './Buttons.tsx';

export default function TodoApp() {
  return (
    <>
      <div className="title-div">
        <h1 className="title-todo">TaskFlow</h1>
      </div>
      <div className="body-div">
        <ButtonStruct />
        <SortingButton />
        <TaskElement />
      </div>
    </>
  );
}
