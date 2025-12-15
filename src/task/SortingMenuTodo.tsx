import type { ChangeEvent } from 'react';
import { SORT_OPTIONS, FILTER_OPTIONS } from '../constants/constants';

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
      <select
        className={`Sorting-menu ${currentSort ? 'active' : ''}`}
        value={currentSort}
        onChange={onSortingChange}
        name="sort"
      >
        <option className="Value" value="">
          Sort By...
        </option>
        <option className="Value" value={SORT_OPTIONS.BY_NAME}>
          Name
        </option>
        <option className="Value" value={SORT_OPTIONS.BY_DUE_DATE}>
          Due Date
        </option>
      </select>
      <select
        className={`Sorting-menu ${currentFilter ? 'active' : ''}`}
        value={currentFilter}
        onChange={onSortingChange}
        name="filter"
      >
        <option className="Value" value="">
          Filter By...
        </option>
        <option className="Value" value={FILTER_OPTIONS.DONE}>
          Done
        </option>
        <option className="Value" value={FILTER_OPTIONS.UNDONE}>
          Undone
        </option>
      </select>
    </div>
  );
}
