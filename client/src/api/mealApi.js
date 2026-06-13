import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
});

export async function generateMealPlan(preferences) {
  const { data } = await api.post('/api/meal-plan/generate', preferences);
  return data;
}

export async function fetchHistory() {
  const { data } = await api.get('/api/meal-plan/history');
  return data.plans;
}

export async function deletePlan(id) {
  await api.delete(`/api/meal-plan/${id}`);
}
