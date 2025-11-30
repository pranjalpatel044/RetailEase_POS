import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const latestOrders = async () => {
  return await axios.get(`${BASE_URL}/orders/latest`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const createOrder = async (order) => {
  return await axios.post(`${BASE_URL}/orders`, order, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export const deleteOrder = async (orderId) => {
  return await axios.delete(`${BASE_URL}/orders/${orderId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};
