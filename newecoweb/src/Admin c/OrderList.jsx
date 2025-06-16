import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnav from './AdminNav';

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    fontSize: '30px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderBottom: '3px solid #007bff',
    paddingBottom: '10px',
    width: '100%',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.05)',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: '600',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
    fontSize: '14px',
    color: '#444',
  },
  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  noOrders: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
    backgroundColor: '#ffffff',
  },
  addressBox: {
    border: '1px solid #ddd',
    padding: '10px',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  button: {
    padding: '6px 12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.2s',
  },
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const handleDel = async (id) => {
    const confirmDelete = window.confirm("Are you sure you completed this order?");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/order/delete/${id}`);
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${baseUrl}/order/list`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <Adminnav />
      <div style={styles.container}>
        <h2 style={styles.heading}>Order List</h2>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Product Name</th>
              <th style={styles.th}>Order Number</th>
              <th style={styles.th}>Customer Name</th>
              <th style={styles.th}>Customer Email</th>
              <th style={styles.th}>Address</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Payment Method</th>
              <th style={styles.th}>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td style={styles.td}>{order._id}</td>
                  <td style={styles.td}>
                    {order.image && (
                      <img
                        src={`${baseUrl}${order.image}`}
                        alt={order.productName}
                        style={styles.image}
                      />
                    )}
                  </td>
                  <td style={styles.td}>{order.productName}</td>
                  <td style={styles.td}>{order.number}</td>
                  <td style={styles.td}>{order.name}</td>
                  <td style={styles.td}>{order.email}</td>
                  <td style={styles.td}>
                    <div style={styles.addressBox}>
                      <div><strong>Address</strong></div>
                      <div><strong>House No/Name:</strong> {order.address}</div>
                      <div><strong>Street:</strong> {order.street}</div>
                      <div><strong>City:</strong> {order.city}</div>
                      <div><strong>District:</strong> {order.district}</div>
                      <div><strong>State:</strong> {order.state}</div>
                      <div><strong>Landmark:</strong> {order.landmark}</div>
                    </div>
                  </td>
                  <td style={styles.td}>₹{order.price}</td>
                  <td style={styles.td}>{order.paymentMethod}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleDel(order._id)}
                      style={styles.button}
                    >
                      Order Completed
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={styles.noOrders}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
