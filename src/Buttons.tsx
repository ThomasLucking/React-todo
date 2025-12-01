export default function ButtonStruct() {
  return (
    <>
      <div className="ButtonStructDiv">
        <input
          className="title style-button"
          type="text"
          placeholder="title"
        ></input>
        <input
          className="content style-button"
          type="text"
          placeholder="content "
        ></input>
        <input className="date style-button" type="Date"></input>
        <button className="Add-button style-button">Add</button>
        <button className="Modify-button style-button">Modify</button>
        <div className="Delete-all-div">
          <button className="Delete-all">Delete All</button>
        </div>
      </div>
    </>
  );
};