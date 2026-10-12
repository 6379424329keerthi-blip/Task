import { getAccessToken } from './auth';

export interface GoogleTaskList {
  id: string;
  title: string;
  updated?: string;
}

export interface GoogleTask {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  due?: string;
  completed?: string;
}

export const getOrCreateKarunyaTaskList = async (
  listTitle: string = 'Karunya Semester Prep (Nov 10)'
): Promise<GoogleTaskList> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google');

  // Fetch existing task lists
  const listsRes = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!listsRes.ok) {
    const errorData = await listsRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch task lists: ${listsRes.statusText}`);
  }

  const listsData = await listsRes.json();
  const existingList = (listsData.items || []).find((l: GoogleTaskList) => l.title === listTitle);
  if (existingList) {
    return existingList;
  }

  // Create new list
  const createRes = await fetch('https://tasks.googleapis.com/tasks/v1/users/@me/lists', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: listTitle }),
  });

  if (!createRes.ok) {
    const errorData = await createRes.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create task list: ${createRes.statusText}`);
  }

  return await createRes.json();
};

export const listTasksInList = async (taskListId: string): Promise<GoogleTask[]> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google');

  const res = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to fetch tasks: ${res.statusText}`);
  }

  const data = await res.json();
  return data.items || [];
};

export const createGoogleTask = async (
  taskListId: string,
  title: string,
  notes?: string,
  due?: string
): Promise<GoogleTask> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google');

  const payload: { title: string; notes?: string; due?: string } = { title };
  if (notes) payload.notes = notes;
  if (due) payload.due = due;

  const res = await fetch(`https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to create task: ${res.statusText}`);
  }

  return await res.json();
};

export const completeGoogleTask = async (
  taskListId: string,
  taskId: string
): Promise<GoogleTask> => {
  const token = await getAccessToken();
  if (!token) throw new Error('Not authenticated with Google');

  const res = await fetch(
    `https://tasks.googleapis.com/tasks/v1/lists/${taskListId}/tasks/${taskId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'completed' }),
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `Failed to complete task: ${res.statusText}`);
  }

  return await res.json();
};
