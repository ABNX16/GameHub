import { useState, useEffect } from "react";
import './pages.css';
import { Link } from 'react-router-dom';
import Nav from "./Nav";
import axios from "axios";

function Page({ showNav = true, showFoot = true }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/user/products`)
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, [baseUrl]);

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/user/products/${id}`)
      .then(() => {
        setItems(prev => prev.filter(item => item._id !== id));
      })
      .catch(err => console.error("Delete error:", err));
  };

  const handleUpdate = (id) => {
    console.log("Update clicked for:", id);
    // You can redirect to an update page or open a modal
  };

  return (
    <div>
      {showNav && <Nav />}
      <div id="all1">
        {error && <div style={styles.error}>{error}</div>}
        {loading ? (
          <div style={styles.loading}>Loading products...</div>
        ) : (
          Object.keys(groupedItems).length > 0 ? (
            <div style={styles.container}>
              {Object.keys(groupedItems).map(category => (
                <div key={category} style={{ width: '100%' }}>
                  <h2 style={styles.categoryTitle}>{category.toUpperCase()}</h2>
                  <div style={styles.container}>
                    {groupedItems[category].map(item => (
                      <div key={item._id} style={styles.card}>
                        <img
                          src={`${baseUrl}${item.image}`}
                          alt={item.name}
                          style={styles.image}
                        />
                        <div style={styles.offer}>{item.offer}% OFF</div>
                        <div style={styles.name}>{item.name}</div>
                        <div style={styles.detail}><s>₹{item.price}</s></div>
                        <div style={styles.detail}>₹{item.offerPrice}</div>
                        <button id="bb1b">BUY NOW</button>
                        <button id="bb2b">Add to Cart</button>
                        <button style={styles.updateBtn} onClick={() => handleUpdate(item._id)}>Update</button>
                        <button style={styles.deleteBtn} onClick={() => handleDelete(item._id)}>Delete</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.error}>No products found.</div>
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
    padding: '40px',
    backgroundColor: 'black',
  },
  categoryTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: '26px',
    margin: '20px 0 10px',
    fontWeight: 'bold'
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    width: '250px',
    padding: '15px',
    boxShadow: '0 0 10px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
  },
  image: {
    width: "200px",
    height: "200px",
    marginBottom: "10px",
    objectFit: 'cover',
    borderRadius: '10px',
  },
  name: {
    color: '#0073e6',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '10px 0 5px',
    textAlign: 'center',
  },
  detail: {
    fontSize: '16px',
    margin: '4px 0',
    color: '#000',
  },
  offer: {
    backgroundColor: '#3d550c',
    color: 'wheat',
    padding: '4px 10px',
    borderRadius: '15px',
    fontSize: '14px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginBottom: '8px',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: 'bold',
  },
  loading: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
    marginTop: '40px',
  },
  updateBtn: {
    marginTop: '8px',
    padding: '5px 10px',
    backgroundColor: '#f0ad4e',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    marginTop: '6px',
    padding: '5px 10px',
    backgroundColor: '#d9534f',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  }
};

export default Page;
