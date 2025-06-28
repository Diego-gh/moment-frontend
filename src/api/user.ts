import request from './util/request';
import { RegisterUserInputType, LoginUserInputType } from '../validation/user';

export const registerUser = async (formData: RegisterUserInputType) => {
  const response = await request.post('/v1/user/register', formData);
  return response.data;
};

export const loginUser = async (formData: LoginUserInputType) => {
  const response = await request.post('/v1/user/login', formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await request.post('/v1/user/logout');
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await request.get('/v1/user');
  return response.data;
};
