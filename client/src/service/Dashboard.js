import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchDashboardData = async () => {
    return await axios.get(`${BASE_URL}/dashboard/recent-orders`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
};
