import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderNav from './OrderNav';
import './comsty.css';
import Footer from './Footer';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
   const userEmail = localStorage.getItem('userEmail');

  const handleDel = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to cancel this order?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/order/delete/${id}`);
        setOrders((prevOrders) => prevOrders.filter(order => order._id !== id));
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/order/${userEmail}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <div className="no-data">Loading orders...</div>;

  return (
    <>
      <OrderNav />
      <div className="container">
        <h2 className="heading">Your Orders</h2>
        {orders.length === 0 ? (
          <div className="no-data">You haven't placed any orders yet.</div>
        ) : (
          <div className="card-grid">
            {orders.map((order) => (
              <div key={order._id} className="card">
                {order.image && (
                  <img
                    src={`http://localhost:5000${order.image}`}
                    alt={order.productName}
                    className="image"
                  />
                )}
                <div className="info">
                  <div><span className="label">Order Number:</span> {order.number}</div>
                  <div><span className="label">Price:</span> ₹{order.price}</div>
                  <div><span className="label">Payment Method:</span> {order.paymentMethod === 'COD' ? 'Cash on Delivery' : order.paymentMethod}</div>
                  <div><span className="label">Shipping Address:</span></div>
                  <div className="address-box">
                    <div><strong>House:</strong> {order.address}</div>
                    <div><strong>Street:</strong> {order.street}</div>
                    <div><strong>City:</strong> {order.city}</div>
                    <div><strong>District:</strong> {order.district}</div>
                    <div><strong>State:</strong> {order.state}</div>
                    <div><strong>Landmark:</strong> {order.landmark}</div>
                  </div>
                  <button onClick={() => handleDel(order._id)} className="button">Cancel Order</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> 
      <div>
      <Footer/></div> 
    </>
  );
};

export default Orders;
