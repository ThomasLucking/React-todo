import { type SavedApiTask } from '../taskAPI/taskapi';
import { create } from 'zustand';

export type TaskState = {
  tasks: SavedApiTask[];
  initializeTasks: (initialTasks: SavedApiTask[]) => void;
  errorMessage: string | null;
  setTasks: (tasks: SavedApiTask[]) => void;
  addTask: (task: SavedApiTask) => void;
  updateTaskData: (updatedTask: SavedApiTask) => void;
  deleteTask: (taskId: number) => void;
  setErrorMessage: (message: string | null) => void;
};

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  initializeTasks: (initialTasks) => set({ tasks: initialTasks }),
  errorMessage: null,
  setTasks: (tasks) => set({ tasks }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  updateTaskData: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t,
      ),
    })),
  deleteTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== taskId),
    })),
  setErrorMessage: (message) => set({ errorMessage: message }),
}));


export const useError = () => {
  const errorMessage = useTaskStore((state) => state.errorMessage);
  const setErrorMessage = useTaskStore((state) => state.setErrorMessage);

  return { errorMessage, setErrorMessage };
};
