import { api } from './Api'

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  const response = await api.post('/auth-service/auth/register', {
    name,
    email,
    password,
    role,
  });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post('/auth-service/auth/login', {
    email,
    password,
  });
  return response.data;
};

export async function resetPassword(token: string, newPassword: string) {
  return api.post('/auth-service/auth/reset-password', {
    token,
    newPassword,
  });
}
