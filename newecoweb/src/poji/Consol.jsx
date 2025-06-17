import { useState, useEffect } from "react";
import './pages.css';
import { Link, useNavigate } from 'react-router-dom';
import Nav from "./Nav";
import axios from "axios";
import Footer from "./Footer";

function Consol({ showNav = true, showFoot = true }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios.get(`${baseUrl}/user/products`)
      .then(response => {
        setItems(response.data);
      })
      .catch(() => {
        setError("Failed to load products.");
      });
  }, [baseUrl]);

  const handleAddToCart = (item) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert('Please login first');

    axios.post(`${baseUrl}/cart/add`, { ...item, userEmail })
      .then(() => alert("Added to cart"))
      .catch(() => alert("Item already in cart"));
  };

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/user/products/${id}`)
      .then(() => {
        setItems(prev => prev.filter(item => item._id !== id));
      })
      .catch(err => console.error("Delete error:", err));
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const consoleItems = groupedItems["Console"] || [];

  return (
    <div>
      {showNav && <Nav />}
      <div id="all1">
        <h1 id="h321">CONSOLES ON SALE</h1>

        {error && <div style={styles.error}>{error}</div>}

        {consoleItems.length > 0 ? (
          <div style={styles.container}>
            {consoleItems.map(item => (
              <div key={item._id} style={styles.card} className="card1">
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.name}
                  style={styles.image}
                />
                <div style={styles.offer}>{item.offer}% OFF</div>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.detail}><s>₹{item.price}</s></div>
                <div style={styles.detail}>₹{item.offerPrice}</div>
                <button id="bb1b" onClick={() => navigate("/buynow", { state: { product: item } })}>
                  BUY NOW
                </button>
                <button id="bb2b" onClick={() => handleAddToCart(item)}>
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.error}>No products found in the "Console" category.</div>
        )}
      </div>

      {showFoot && <div id="footerr"><Footer /></div>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '30px',
    backgroundColor: 'black',
    padding: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    width: '210px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  image: {
    width: "200px",
    height: "200px",
    marginBottom: "10px",
    objectFit: "cover",
    borderRadius: "10px",
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
    color: 'black',
    textAlign: 'center',
    marginTop: '20px',
    fontWeight: 'bold',
  },
};

export default Consol;
