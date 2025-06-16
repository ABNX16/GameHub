import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnav from './AdminNav';

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
    padding: '12px 15px',
    textAlign: 'left',
    fontWeight: '600',
    textTransform: 'capitalize', // Capitalize first letter of header text
  },
  td: {
    padding: '12px 15px',
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
  noOrders: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
    backgroundColor: '#ffffff',
    marginTop: '20px',
  },
  buttonAccept: {
    backgroundColor: 'green',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '10px',
    transition: 'background-color 0.3s ease',
  },
  buttonReject: {
    backgroundColor: 'red',
    color: 'white',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  rowHover: {
    transition: 'background-color 0.3s ease',
  },
};

const Visited = () => {
  const [visitedSellers, setVisitedSellers] = useState([]);

  useEffect(() => {
    const fetchVisited = async () => {
      try {
        const res = await axios.get("https://gamehub-cm5b.onrender.com/visited");
        setVisitedSellers(res.data);
      } catch (error) {
        console.error('Error fetching visited sellers:', error);
      }
    };
    fetchVisited();
  }, []);

  const handleDeladd = async (seller) => {
    const userEmail = localStorage.getItem('userEmail');
 
    const confirmDelete = window.confirm('Are you sure you accept this product?');
    if (confirmDelete) {
      try {
        await axios.post("https://gamehub-cm5b.onrender.com/accept/add", {
          userEmail: seller.userEmail,
          name: seller.name,
          number: seller.number,
          email: seller.email,
          address: seller.address,
          productName: seller.productName,
          category: seller.category,
          purchaseDate: seller.purchaseDate,
          upiId: seller.upiId,
          productImage: seller.productImage,
        });
        await axios.delete(`https://gamehub-cm5b.onrender.com/visited/delete/${seller._id}`);
        setVisitedSellers((prev) => prev.filter((s) => s._id !== seller._id));
      } catch (error) {
        console.error('Error updating visited sellers:', error);
      }
    }
  };

  const handleDel = async (seller) => {
    const userEmail = localStorage.getItem('userEmail');
   
   const confirmDelete = window.confirm('Are you sure you accept this product?');
    if (confirmDelete) {
      try {
        await axios.post("https://gamehub-cm5b.onrender.com:5000/reject/add", {
          userEmail: seller.userEmail,
          name: seller.name,
          number: seller.number,
          email: seller.email,
          address: seller.address,
          productName: seller.productName,
          category: seller.category,
          purchaseDate: seller.purchaseDate,
          upiId: seller.upiId,
          productImage: seller.productImage,
        });
        await axios.delete(`https://gamehub-cm5b.onrender.com/visited/delete/${seller._id}`);
        setVisitedSellers((prev) => prev.filter((s) => s._id !== seller._id));
      } catch (error) {
        console.error('Error updating visited sellers:', error);
      }
    }
  };

  return (
    <div>
      <Adminnav />
      <div style={styles.container}>
        <h2 style={styles.heading}>Visited Sellers</h2>

        {visitedSellers.length === 0 ? (
          <div style={styles.noOrders}>No visited sellers found.</div>
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
                <th style={styles.th}>Purchased</th>
                <th style={styles.th}>UPI</th>
                
                <th style={styles.th}>Result</th>
              </tr>
            </thead>
            <tbody>
              {visitedSellers.map((seller) => (
                <tr
                  key={seller._id}
                  style={{ cursor: 'default' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={styles.td}>
                    <img
                      src={`https://gamehub-cm5b.onrender.com/uploads/${seller.productImage}`}
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
                    <button
                      style={styles.buttonAccept}
                      onClick={() => handleDeladd(seller)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005700')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'green')}
                    >
                      ACCEPTED
                    </button>
                    <button
                      style={styles.buttonReject}
                      onClick={() => handleDel(seller)}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#7a0000')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'red')}
                    >
                      REJECTED
                    </button>
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

export default Visited;
