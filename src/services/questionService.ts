import { api } from './Api';

export interface Question {
  id?: string;
  text: string;
  options: string[];
  correctOption: string;
  imageUrl?: string;
  placeholderUrl?: string;
  classLevel: string;
}

export async function createQuestion(data: Question) {
  return api.post('/question-service/questions/add', data);
}

export async function getQuestionsByClassLevel(classLevel: string) {
  return api.get(`/question-service/questions/${encodeURIComponent(classLevel)}`);
}
