import { api } from './Api';

export interface QuestionPayload {
  question: string;
  grade: number;
  subject: string;
  alternatives: string[];
  correctIndex: number;
}

export async function createQuestion(data: QuestionPayload) {
  return api.post('/questions', data);
}