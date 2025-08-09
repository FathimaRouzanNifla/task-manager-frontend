import api from '../api/axios';

export const register = async (name, email, password) => {
  const response = await api.post('/api/auth/register', {
    name,
    email,
    password
  });
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/api/auth/login', {
    email,
    password
  });
  return response.data;
};

export const logout = async () => {
  return await api.post('/api/auth/logout');
};

export const getProfile = async () => {
  return await api.get('/api/auth/profile');
};