import request from './util/request';
import { LoginFormType, RegisterFormType } from '../routes/auth/types';

export const registerUser = async (formData: RegisterFormType) => {
  const response = await request.post('/user/auth/register', formData);
  return response.data;
};

export const loginUser = async (formData: LoginFormType) => {
  const response = await request.post('/user/auth/login', formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await request.post('/user/auth/logout');
  return response.data;
};

export const getUser = async (username: string) => {
  const response = await request.get(`/user/${username}`);
  return response.data;
};
