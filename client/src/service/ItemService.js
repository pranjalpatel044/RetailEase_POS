import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addItem = async (item) => {
    return await axios.post(`${BASE_URL}/admin/items`, item, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};

export const deleteItem = async (itemId) => {
    return await axios.delete(`${BASE_URL}/admin/items/${itemId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};

export const fetchItems = async () => {
    return await axios.get(`${BASE_URL}/items`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};
