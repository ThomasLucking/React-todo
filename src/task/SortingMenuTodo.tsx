export default function SortingMenuTodo() {
  return (
      <div className="Sorting-menu-div">
        <select className="Sorting-menu">
        <option className="Value" value="sort-by-name">
            Name
          </option>
          <option className="Value" value="option2">
            Due Date
          </option>
        </select>
        <select className="Sorting-menu">
          <option className="Value" value="option1">
            done
          </option>
          <option className="Value" value="option1">
            Undone
          </option>
        </select>
      </div>
  );
}
