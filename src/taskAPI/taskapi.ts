export interface ApiTask {
  title: string;
  content: string;
  due_date: string | null;
  done: boolean;
}

export type SavedApiTask = ApiTask & { id: number };

async function RequestData<Data>(
  url: string,
  method: string,
  body?: Record<string, unknown>,
): Promise<Data[]> {
  const fetchOptions: RequestInit = {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  } else if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    throw new Error(`API call using ${method} requires a request body.`);
  }

  try {
    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
      const errorDetail = await response.text();
      throw new Error(
        `Error with the API: ${response.status} ${response.statusText || ''}. Details: ${errorDetail}`,
      );
    }

    const data = (await response.json()) as Data[];
    return data;
  } catch (error) {
    console.error('API Request Failed:', error);
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

  const data = await RequestData<SavedApiTask>(API_URL, 'POST', payload);

  return data[0] as SavedApiTask;
};

export const fetchTasks = async () => {
  const data = await RequestData<SavedApiTask>(API_URL, 'GET');
  return data;
};

export const deleteTasksViaAPI = async (taskid: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}?id=eq.${taskid}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Delete Request Failed:', error);
    throw error;
  }
};

export const updateTask = async (task: SavedApiTask): Promise<SavedApiTask> => {
  const updateBody = {
    title: task.title,
    content: task.content,
    due_date: task.due_date,
    done: task.done,
  };

  const data = await RequestData<SavedApiTask>(
    `${API_URL}?id=eq.${task.id}`,
    'PATCH',
    updateBody,
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
