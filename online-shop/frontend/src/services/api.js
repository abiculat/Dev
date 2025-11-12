import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => localStorage.getItem('token');

// Auth Service
export const authService = {
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
  getProfile: () =>
    axios.get(`${API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  updateProfile: (userData) =>
    axios.put(`${API_URL}/auth/profile`, userData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
};

// Product Service
export const productService = {
  getAll: (params) => axios.get(`${API_URL}/products`, { params }),
  getById: (id) => axios.get(`${API_URL}/products/${id}`),
  create: (productData) =>
    axios.post(`${API_URL}/products`, productData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  update: (id, productData) =>
    axios.put(`${API_URL}/products/${id}`, productData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  delete: (id) =>
    axios.delete(`${API_URL}/products/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
};

// Order Service
export const orderService = {
  create: (orderData) =>
    axios.post(`${API_URL}/orders`, orderData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  getAll: (isAdmin = false) =>
    axios.get(`${API_URL}/orders`, {
      params: { isAdmin },
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  getById: (id, isAdmin = false) =>
    axios.get(`${API_URL}/orders/${id}`, {
      params: { isAdmin },
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  update: (id, orderData) =>
    axios.put(`${API_URL}/orders/${id}`, orderData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  delete: (id) =>
    axios.delete(`${API_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    }),
  getNearby: (latitude, longitude) =>
    axios.get(`${API_URL}/orders/nearby`, {
      params: { latitude, longitude },
      headers: { Authorization: `Bearer ${getToken()}` }
    })
};
