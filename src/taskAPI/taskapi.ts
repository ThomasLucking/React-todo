export interface ApiTask {
  title: string;
  content: string;
  due_date: string | null;
  done: boolean;
}

export type SavedApiTask = ApiTask & { id: number };

async function requestData<T>(
  url: string,
  method: string,
  messages: { loading: string; success: string; error: string },
  headers?: Record<string, string>,
  body?: unknown,
): Promise<T[]> {
  try {
    const response = await fetch(url, {
      method: method,
      headers: headers || {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Error with the API: ${response.status}`);
    }

    const data = (await response.json()) as T[];
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const API_URL = 'https://api.todos.in.jt-lab.ch/todos';

export const saveTasksViaAPI = async (task: ApiTask): Promise<SavedApiTask> => {
  const payload = {
    title: task.title,
    content: task.content,
    due_date: task.due_date || null,
    done: task.done,
  };

  const data = await requestData<SavedApiTask>(
    API_URL,
    'POST',
    {
      loading: '...loading',
      success: 'Task successfully saved.',
      error: 'Failed to save task',
    },
    undefined,
    payload,
  );

  return data[0] as SavedApiTask;
};

export const fetchTasks = async () => {
  const data = await requestData<SavedApiTask>(API_URL, 'GET', {
    loading: 'Loading tasks...',
    success: 'Tasks successfully loaded!',
    error: 'Failed to load tasks',
  });
  return data;
};

// const deleteTasksViaAPI = async (taskid: number): Promise<void> => {
//   await requestData<void>(
//     `${API_URL}?id=eq.${taskid}`,
//     'DELETE',
//     {
//       loading: 'Attempting to delete task...',
//       success: 'Task successfully deleted',
//       error: 'Failed to delete task',
//     },
//     undefined,
//     undefined,
//   );
// };

export const updateTaskStateViaAPI = async (
  task: SavedApiTask,
  done: boolean,
): Promise<SavedApiTask> => {
  const data = await requestData<SavedApiTask>(
    `${API_URL}?id=eq.${task.id}`,
    'PATCH',
    {
      loading: 'Attempting to update state of task...',
      success: 'Updated State of task successfully',
      error: 'Failed to update task state',
    },
    undefined,
    { done },
  );
  return data[0] as SavedApiTask;
};

// const deleteAllTasksViaAPI = async (): Promise<void> => {
//   await requestData<void>(
//     API_URL,
//     'DELETE',
//     {
//       loading: 'Attempting to delete tasks...',
//       success: 'All tasks Succesfully deleted',
//       error: 'Failed to delete tasks',
//     },
//     undefined,
//     undefined,
//   );
// };
