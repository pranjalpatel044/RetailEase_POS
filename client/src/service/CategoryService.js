import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addCategory = async (category) => {
  return await axios.post(`${BASE_URL}/admin/categories`, category, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
};

export const deleteCategory = async (categoryId) => {
  return await axios.delete(`${BASE_URL}/admin/categories/${categoryId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
};

export const fetchCategory = async () => {
  return await axios.get(`${BASE_URL}/categories`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
};
