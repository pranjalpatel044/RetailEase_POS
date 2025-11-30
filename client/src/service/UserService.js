import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const addUser = async (user) => {
    return await axios.post(`${BASE_URL}/admin/register`, user, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};

export const deleteUser = async (userId) => {
    return await axios.delete(`${BASE_URL}/admin/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};

export const fetchUsers = async () => {
    return await axios.get(`${BASE_URL}/admin/users`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};
