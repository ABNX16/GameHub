import { useState, useEffect } from "react";
import './pages.css';
import { useNavigate } from 'react-router-dom';
import Nav from "./Nav";
import axios from "axios";
import Footer from "./Footer";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Accx({ showNav = true, showFoot = true }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${baseUrl}/user/products`)
      .then(response => {
        setItems(response.data || []);
      })
      .catch(() => {
        setError('Failed to load products.');
      });
  }, []);

  const handleAddToCart = (item) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) {
      alert('Please login first');
      return;
    }

    axios.post(`${baseUrl}/cart/add`, { ...item, userEmail })
      .then(() => alert("Added to cart"))
      .catch(() => alert("Item already in cart"));
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const AccxItems = groupedItems['Accessories'] || [];

  return (
    <div>
      {showNav && <Nav />}

      <div id="all1">
        <h1 id="h321">Accessories on Sale</h1>
        {error && <div style={styles.error}>{error}</div>}

        {AccxItems.length > 0 ? (
          <div style={styles.container}>
            {AccxItems.map(item => (
              <div key={item._id} style={styles.card} className="card2">
                <img
                  src={`${baseUrl}${item.image}`}
                  alt={item.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                  style={styles.image}
                />
                <div style={styles.offer}>{item.offer}%</div>
                <div style={styles.name}>{item.name}</div>
                <div style={styles.detail}><s>₹{item.price}</s></div>
                <div style={styles.detail}>₹{item.offerPrice}</div>
                <button
                  id="bb1b"
                  onClick={() => navigate("/buynow", { state: { product: item } })}
                >
                  BUY NOW
                </button>
                <button
                  id="bb2b"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noItems}>No products found in the "Accessories" category.</div>
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
    padding: '40px',
    backgroundColor: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    width: '250px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
  },
  image: {
    width: "200px",
    height: "200px",
    marginBottom: "10px",
    objectFit: "cover",
    borderRadius: "8px",
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
  noItems: {
    textAlign: 'center',
    padding: '30px',
    color: '#999',
    fontSize: '18px',
  },
};

export default Accx;
