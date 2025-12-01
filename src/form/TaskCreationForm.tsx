import DeleteAllButton from './DeleteAllButton';

export default function TaskCreationForm() {
  return (
    <div className="ButtonStructDiv">
      <input className="title style-button" type="text" placeholder="title" />
      <input
        className="content style-button"
        type="text"
        placeholder="content"
      />
      <input className="date style-button" type="date" />
      <button className="Add-button style-button">Add</button>
      <DeleteAllButton />
    </div>
  );
}
