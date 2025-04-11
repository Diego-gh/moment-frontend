import request from './util/request';
import { LoginFormType, RegisterFormType } from '../routes/auth/types';

export const loginUser = async (formData: LoginFormType) => {
  const response = await request.post('/auth/login', formData);
  return response.data;
};

export const registerUser = async (formData: RegisterFormType) => {
  const response = await request.post('/auth/register', formData);
  return response.data;
};
