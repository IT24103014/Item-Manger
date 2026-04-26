import axios from 'axios';
const API = axios.create({baseURL: import.meta.env.VITE_API_URL,});
export const getItems = () => API.get('/api/items');
export const createItem = (data) => API.post('/api/items', data);
export const deleteItem = (id) => API.delete(`/api/items/${id}`);
export const updateItem = (id, data) => API.put(`/api/items/${id}`, data);