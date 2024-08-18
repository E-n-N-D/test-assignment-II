import axios from 'axios';

axios.defaults.baseURL = 'https://test-assignment-ii-1.onrender.com/api';

export const loginUser = async (username: string, password: string) => {
  const response = await axios.post('/auth/login', { username, password });
  return response.data;
};

export const registerUser = async (username: string, password: string) => {
  const response = await axios.post('/auth/register', { username, password });
  return response.data;
};

export const getChains = async () => {
  const response = await axios.get('/chain');
  return response.data;
};

export const getPostsByChain = async (chainId: string) => {
  const response = await axios.get(`/post/${chainId}`);
  return response.data;
};

export const createChain = async (startNumber: number, token: string) => {
  const response = await axios.post(
    '/chain/create',
    { startNumber },
    { headers: { 'x-auth-token': `${token}` } }
  );
  return response.data;
};

export const addPost = async (chain: string, operation: string, operand: number, token: string, prevPost?: string,) => {
  const response = await axios.post(
    '/post/reply',
    { chain, prevPost, operation, operand },
    { headers: { 'x-auth-token': `${token}` } }
  );
  return response.data;
};
