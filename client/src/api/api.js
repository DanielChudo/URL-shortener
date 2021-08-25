import axios from 'axios';

export const authAPI = {
  registration: (email, password) =>
    axios.post('/api/auth/registration', { email, password }),
  login: (email, password) =>
    axios.post('/api/auth/login', { email, password }),
  refresh: () => axios.get('/api/auth/refresh'),
  logout: () => axios.post('/api/auth/logout'),
};

const instance = axios.create({});

export const linkAPI = {
  generateShortLink: (originalLink) =>
    instance.post('/api/link/generate-link', { originalLink }),
  getUserLinks: () => instance.get('/api/link/all'),
  getLinkByCode: (code) => instance.get(`/api/link/${code}`),
};

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default instance;
