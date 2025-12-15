import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación (excepto en auth)
api.interceptors.request.use((config) => {
  // No agregar token a rutas de autenticación
  if (!config.url.includes('/auth/')) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const productsAPI = {
  getAll: () => api.get('/products'),
  getByCategory: (categoryId) => api.get(`/products/category/${categoryId}`),
};

export const ordersAPI = {
  create: (orderData) => api.post('/orders', orderData),
};

export default api;