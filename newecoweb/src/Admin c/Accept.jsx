import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnav from './AdminNav';

// Use environment variable
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
    verticalAlign: 'middle',
  },
  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  noData: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
    backgroundColor: '#ffffff',
    marginTop: '20px',
  },
};

const Accpet = () => {
  const [acceptedSellers, setAcceptedSellers] = useState([]);

  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const res = await axios.get(`${baseUrl}/accept/`);
        setAcceptedSellers(res.data);
      } catch (error) {
        console.error('Error fetching accepted sellers:', error);
      }
    };
    fetchAccepted();
  }, []);

  const handleDel = async (accept) => {
    const confirmDelete = window.confirm('Are you sure you want to reject this product?');
    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/accept/delete/${accept._id}`);
        setAcceptedSellers((prev) => prev.filter((s) => s._id !== accept._id));
      } catch (error) {
        console.error('Error deleting accepted seller:', error);
      }
    }
  };

  return (
    <div>
      <Adminnav />
      <div style={styles.container}>
        <h2 style={styles.heading}>Accepted Sellers</h2>
        {acceptedSellers.length === 0 ? (
          <div style={styles.noData}>No accepted sellers found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Seller</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Purchase Date</th>
                <th style={styles.th}>UPI ID</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {acceptedSellers.map((seller) => (
                <tr key={seller._id}>
                  <td style={styles.td}>
                    <img
                      src={`${baseUrl}/uploads/${seller.productImage}`}
                      alt={seller.productName}
                      style={styles.image}
                    />
                  </td>
                  <td style={styles.td}>{seller.productName}</td>
                  <td style={styles.td}>{seller.name}</td>
                  <td style={styles.td}>{seller.number}</td>
                  <td style={styles.td}>{seller.email}</td>
                  <td style={styles.td}>{seller.address}</td>
                  <td style={styles.td}>{seller.category}</td>
                  <td style={styles.td}>{seller.purchaseDate}</td>
                  <td style={styles.td}>{seller.upiId}</td>
                  <td style={styles.td}>
                    <button onClick={() => handleDel(seller)}>Package received</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Accpet;
