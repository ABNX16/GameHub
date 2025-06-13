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
  noOrders: {
    textAlign: 'center',
    color: '#888',
    padding: '20px',
    backgroundColor: '#ffffff',
    marginTop: '20px',
  },
};

const SellerList = () => {
  const [sellers, setSellers] = useState([]);
  

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/seller');
        setSellers(res.data);
      } catch (err) {
        console.error('Error fetching sellers:', err);
      }
    };
    fetchSellers();
  }, []);

  const handleDel = async (seller) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return 
    alert('Please login first');
    const confirmDelete = window.confirm("Are you sure you visited this address for verification?");
    if (confirmDelete) 
       {
      try {
        await axios.post('http://localhost:5000/visited/add', {
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
        

        await axios.delete(`http://localhost:5000/seller/delete/${seller._id}`);
        setSellers((prev) => prev.filter(s => s._id !== seller._id));
      } catch (error) {
        console.error('Error updating visited sellers:', error);
      }
    }
  };

  return (
    <div>
      <Adminnav />
      <div style={styles.container}>
        <h2 style={styles.heading}>Seller Products</h2>
        {sellers.length === 0 ? (
          <div style={styles.noOrders}></div>
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
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr key={seller._id}>
                  <td style={styles.td}>
                    <img
                      src={`http://localhost:5000/uploads/${seller.productImage}`}
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
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        padding: '8px 14px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                      }}
                      onClick={() => handleDel(seller)}
                    >
                      Visited the address for verification
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

export default SellerList;
