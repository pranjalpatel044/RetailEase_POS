import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createRazorpayOrder = async (data) => {
    return await axios.post(`${BASE_URL}/payments/create-order`, data, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
};

export const verifyPayment = async (paymentData) => {
    return await axios.post(`${BASE_URL}/payments/verify`, paymentData, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
    });
};
