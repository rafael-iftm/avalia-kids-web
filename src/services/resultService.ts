import { api } from './Api';

export interface Result {
  studentName: string;
  classroom: string;
  score: number;
}

export async function getResults(): Promise<Result[]> {
  const response = await api.get('/results');
  return response.data;
}