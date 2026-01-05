import { useTaskStore } from '../store/useTasksStore';
import { deleteAllTasksViaAPI } from '../taskAPI/taskapi';
export default function DeleteAllButton() {
  const deleteAllTasks = useTaskStore((state) => state.deleteAllTasks);
  const setErrorMessage = useTaskStore((state) => state.setErrorMessage);

  const handleDeleteAll = async () => {
    try {
      await deleteAllTasksViaAPI();
      deleteAllTasks();
    } catch (error) {
      setErrorMessage('Failed to delete task. Please try again.');
      console.error('Error deleting task:', error);
    }
  };
  return (
    <div className="Delete-all-div">
      <button type="button" className="Delete-all" onClick={handleDeleteAll}>
        Delete All
      </button>
    </div>
  );
}
