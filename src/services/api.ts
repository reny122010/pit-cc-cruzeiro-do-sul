import { API_URL } from '../config';
import { Note } from '../entities/Note';
import { Task } from '../entities/Task';
import { simpleDateFormat } from '../helpers/date';

function getToken() {
  return JSON.parse(localStorage.getItem('token') ?? '');
}

export async function getArea(q = null) {
  const parameter = q ? `?q=${q}` : '';
  const response = await fetch(`${API_URL}/areas${parameter}`, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
      Authorization: `Bearer ${getToken()}`,
    }),
  });
  return await response.json();
}

export async function updateTask(
  props: {
    areaId: string;
    specialityId: string;
    taskId: string;
  },
  task: Task
) {
  await fetch(
    `${API_URL}/areas/${props.areaId}/specialities/${props.specialityId}/tasks/${props.taskId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(task),
    }
  );
}

export async function cancelTask(props: {
  areaId: string;
  specialityId: string;
  taskId: string;
}) {
  await fetch(
    `${API_URL}/areas/${props.areaId}/specialities/${props.specialityId}/tasks/${props.taskId}/cancel`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}

export async function createTaskComment(
  props: {
    areaId: string;
    specialityId: string;
    taskId: string;
  },
  text: string
) {
  await fetch(
    `${API_URL}/areas/${props.areaId}/specialities/${props.specialityId}/tasks/${props.taskId}/comments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify({ text }),
    }
  );
}

export async function getSecurityNotes(date: Date): Promise<Note[]> {
  const response = await fetch(
    `${API_URL}/securities/${simpleDateFormat(date)}`
  );
  const { securities } = await response.json();
  return securities;
}

export async function updateSecurityNote(
  id: string,
  date: Date,
  amount: number
) {
  await fetch(`${API_URL}/securities/${id}/events`, {
    method: 'POST',
    body: JSON.stringify({
      date: simpleDateFormat(date),
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getFacilityNotes(date: Date): Promise<Note[]> {
  const response = await fetch(
    `${API_URL}/facilities/${simpleDateFormat(date)}`
  );
  const { facilities } = await response.json();
  return facilities;
}

export async function updateFacilityNote(
  id: string,
  date: Date,
  amount: number
) {
  await fetch(`${API_URL}/facilities/${id}/events`, {
    method: 'POST',
    body: JSON.stringify({
      date: simpleDateFormat(date),
      amount,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getDashboardData() {
  const [factory, byArea, byUser] = await Promise.all([
    (await fetch(`${API_URL}/dashboard/factory`)).json(),
    (await fetch(`${API_URL}/dashboard/byArea`)).json(),
    (await fetch(`${API_URL}/dashboard/byUser`)).json(),
  ]);
  return { factory, byArea, byUser };
}
