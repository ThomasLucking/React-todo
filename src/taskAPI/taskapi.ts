export interface ApiTask {
  title: string;
  content: string;
  due_date: string | null;
  done: boolean;
}

export type SavedApiTask = ApiTask & { id: number };
const API_URL = 'http://localhost:3000/api/todos';

async function RequestData<Data>(
  url: string,
  method: string, 
  body?: Record<string, unknown>,
): Promise<Data> {
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


    const text = await response.text();
    return text ? JSON.parse(text) : ({} as Data);
  } catch (error) {
    console.error('API Request Failed:', error);
    throw error;
  }
}


export const saveTasksViaAPI = async (task: ApiTask): Promise<SavedApiTask> => {
  const payload = {
    title: task.title,
    content: task.content,
    due_date: task.due_date || null,
    done: task.done,
  };

  const data = await RequestData<SavedApiTask>(API_URL, 'POST', payload);

  return (Array.isArray(data) ? data[0] : data) as SavedApiTask;
};


export const fetchTasks = async (): Promise<SavedApiTask[]> => {
  const data = await RequestData<SavedApiTask[]>(API_URL, 'GET');
  return data;
};

export const deleteTasksViaAPI = async (taskid: number): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/${taskid}`, {
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
    done: Boolean(task.done),
  };

  
  
  const response = await RequestData<{ success: boolean; data: SavedApiTask }>(
    `${API_URL}/${task.id}`,
    'PATCH',
    updateBody,
  );
  
  
  return response.data;
};

export const deleteAllTasksViaAPI = async (): Promise<void> => {
  const deleteUrl = `${API_URL}`;
  await RequestData<unknown>(deleteUrl, 'DELETE');
};
