import type { ChangeEvent } from 'react';

interface SortingMenuTodoProps {
  onSortingChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentSort: string;
  currentFilter: string;
}

export default function SortingMenuTodo({
  onSortingChange,
  currentSort,
  currentFilter,
}: SortingMenuTodoProps) {

  return (
    <div className="Sorting-menu-div">
      <select className={`Sorting-menu ${currentSort ? 'active' : ''}`} value={currentSort} onChange={onSortingChange} name="sort">
        <option className="Value" value="" >
          Sort By...
        </option>
        <option className="Value" value="sort-by-name">
          Name
        </option>
        <option className="Value" value="due-date">
          Due Date
        </option>
      </select>
      <select className={`Sorting-menu ${currentFilter ? 'active' : ''}`} value={currentFilter} onChange={onSortingChange} name="filter">
        <option className="Value" value="">
          Filter By...
        </option>
        <option className="Value" value="sort-by-done-first">
          Done
        </option>
        <option className="Value" value="sort-by-undone-first">
          Undone
        </option>
      </select>
    </div>
  );
}
