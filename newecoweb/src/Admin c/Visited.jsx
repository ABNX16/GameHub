import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnav from './AdminNav';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const styles = {
  container: {
    padding: '30px',
    fontFamily: 'Segoe UI, sans-serif',
    backgroundColor: '#f0f2f5',
    minHeight: '100vh',
  },
  heading: {
    fontSize: '30px',
    fontWeight: 'bold',
    marginBottom: '25px',
    textAlign: 'center',
    color: '#2c3e50',
    borderBottom: '3px solid #007bff',
    paddingBottom: '10px',
    textTransform: 'uppercase',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 15px rgba(0,0,0,0.05)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '12px',
    fontWeight: '600',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #eee',
    fontSize: '14px',
    color: '#333',
    verticalAlign: 'middle',
  },
  image: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  empty: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#666',
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '10px',
  },
};

const Visited = () => {
  const [visitedSellers, setVisitedSellers] = useState([]);

  useEffect(() => {
    const fetchVisited = async () => {
      try {
        const res = await axios.get(`${baseUrl}/visited`);
        setVisitedSellers(res.data);
      } catch (err) {
        console.error('Error fetching visited sellers:', err);
      }
    };
    fetchVisited();
  }, []);

  return (
    <div>
      <Adminnav />
      <div style={styles.container}>
        <h2 style={styles.heading}>Visited Seller List</h2>

        {visitedSellers.length === 0 ? (
          <div style={styles.empty}>No visited sellers found.</div>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Image</th>
                <th style={styles.th}>Product</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Address</th>
                <th style={styles.th}>Category</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>UPI</th>
              </tr>
            </thead>
            <tbody>
              {visitedSellers.map((seller) => (
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Visited;
