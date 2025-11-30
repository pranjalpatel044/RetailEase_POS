import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import { toast } from "react-hot-toast";
import { fetchDashboardData } from "../../service/Dashboard";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetchDashboardData();
        console.log("Dashboard data:", response.data); 
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
        toast.error("Unable to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const todaySales = orders.reduce((sum, o) => sum + o.grandTotal, 0);
  const todayOrderCount = orders.length;

  if (loading) {
    return (
      <div className="spinner-border text-light loading" role="status">
        Loading dashboard...
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center mt-4 text-light error">
        No orders available for today...
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-currency-rupee"></i>
          </div>
          <div className="stat-content">
            <h3>Total Sales</h3>
            <p>₹{todaySales.toFixed(2)}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">
            <i className="bi bi-cart-check"></i>
          </div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <p>{todayOrderCount}</p>
          </div>
        </div>
      </div>

      <div className="recent-orders-card">
        <h3 className="recent-order-title">
          <i className="bi bi-clock-history"></i> Recent Orders
        </h3>
        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>{order.orderId?.substring(0, 8) ?? "N/A"}...</td>
                  <td>{order.customerName ?? "N/A"}</td>
                  <td>₹{(order.grandTotal ?? 0).toFixed(2)}</td>
                  <td>
                    <span
                      className={`payment-method ${
                        order.paymentMethod?.toLowerCase() || "unknown"
                      }`}
                    >
                      {order.paymentMethod ?? "N/A"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`status-badge ${
                        order.paymentDetails?.status?.toLowerCase() || "unknown"
                      }`}
                    >
                      {order.paymentDetails?.status ?? "N/A"}
                    </span>
                  </td>
                  <td>
                    {order?.createdAt
                      ? new Date(order.createdAt).toLocaleString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
