import request from './util/request';
import { RegisterUserInput, LoginUserInput } from '../validation/user';

export const registerUser = async (formData: RegisterUserInput) => {
  const response = await request.post('/user/register', formData);
  return response.data;
};

export const loginUser = async (formData: LoginUserInput) => {
  const response = await request.post('/user/login', formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await request.post('/user/logout');
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await request.get(`/user/${username}`);
  return response.data;
};
