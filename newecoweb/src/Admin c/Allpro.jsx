import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Adminnav from './AdminNav';

// 🔗 Base URL from .env
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

function Allpro() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    axios.get(`${BASE_URL}/admin/products`)
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        setError('Failed to load products.');
      });
  }, []);

  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      gap: '30px',
      padding: '40px',
      backgroundColor: '#f5f5f5',
    },
    card: {
      backgroundColor: 'black',
      borderRadius: '12px',
      width: '280px',
      padding: '20px',
      boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    },
    cardHover: {
      transform: 'scale(1.03)',
      boxShadow: '0 12px 24px rgb(0, 92, 241)',
    },
    image: {
      width: '250px',
      height: '250px',
      objectFit: 'cover',
      borderRadius: '10px',
      marginBottom: '12px',
    },
    name: {
      color: 'white',
      fontSize: '20px',
      fontWeight: '600',
      margin: '10px 0 5px',
      textAlign: 'center',
    },
    detail: {
      fontSize: '16px',
      margin: '4px 0',
      color: 'white',
    },
    offer: {
      backgroundColor: '#1b5e20',
      color: '#fff',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: '600',
      alignSelf: 'flex-start',
      marginBottom: '10px',
    },
    deleteButton: {
      marginTop: '10px',
      padding: '10px 18px',
      fontSize: '15px',
      border: 'none',
      borderRadius: '25px',
      backgroundColor: '#e53935',
      color: '#fff',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    editButton: {
      marginTop: '8px',
      padding: '8px 16px',
      backgroundColor: '#009688',
      color: 'white',
      border: 'none',
      borderRadius: '20px',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      width: '280px'
    },
    heading: {
      textAlign: 'center',
      fontSize: '30px',
      marginBottom: '10px',
      color: 'black',
      padding: '10px',
      borderRadius: '6px',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      width: '100%',
      fontWeight: '700'
    },
    error: {
      color: 'red',
      textAlign: 'center',
      marginTop: '20px',
      fontWeight: 'bold',
    },
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleDelete = (productId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      axios.delete(`${BASE_URL}/admin/products/${productId}`)
        .then(() => {
          setItems(items.filter(item => item._id !== productId));
        })
        .catch(error => {
          console.error('Error deleting product:', error);
        });
    }
  };

  return (
    <div>
      <div><Adminnav /></div>
      <div id="all-products-page">
        {error && <div style={styles.error}>{error}</div>}
        {Object.keys(groupedItems).length > 0 && (
          <div style={styles.container}>
            {Object.keys(groupedItems).map(category => (
              <div key={category} style={{ width: '100%' }} id={`category-${category}`}>
                <div style={styles.heading}>{category}</div>
                <div style={styles.container}>
                  {groupedItems[category].map(item => (
                    <div
                      key={item._id}
                      id={`product-card-${item._id}`}
                      style={
                        hoveredCard === item._id
                          ? { ...styles.card, ...styles.cardHover }
                          : styles.card
                      }
                      onMouseEnter={() => setHoveredCard(item._id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <img
                        src={`${BASE_URL}${item.image}`}
                        alt={item.name}
                        style={styles.image}
                        id={`product-image-${item._id}`}
                      />
                      <div style={styles.offer}>{item.offer}% OFF</div>
                      <div style={styles.name}>{item.name}</div>
                      <div style={styles.detail}>Price: ₹{item.price}</div>
                      <div style={styles.detail}>Offer Price: ₹{item.offerPrice}</div>
                      <button
                        style={styles.deleteButton}
                        onClick={() => handleDelete(item._id)}
                        id={`delete-button-${item._id}`}
                      >
                        Delete
                      </button>
                      <Link to={`/admin/edit/${item._id}`}>
                        <button style={styles.editButton} id={`edit-button-${item._id}`}>
                          Edit
                        </button>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Allpro;
