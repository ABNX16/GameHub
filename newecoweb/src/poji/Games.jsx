import { useState, useEffect } from "react";
import './pages.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from "./Footer";
import Nav from "./Nav";
import axios from "axios";

function Games({ showNav = true, showFoot = true }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/user/products')
      .then(response => {
        setItems(response.data);
      })
      .catch(() => {
        setError('Failed to load products.');
      });
  }, []);

  const handleAddToCart = (item) => {
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert('Please login first');

    axios.post('http://localhost:5000/cart/add', { ...item, userEmail })
      .then(() => alert("Added to cart"))
      .catch(err => alert("Item already in cart"));
  };

  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const gamesItems = groupedItems["Game"] || [];

  return (
    <div>
      {showNav && <Nav />}
      <div id="all1">
        <h1 id="h321">GAMES ON SALES</h1>
        {error && <div style={styles.error}>{error}</div>}
        {gamesItems.length > 0 ? (
          <div style={styles.container}>
            <div style={styles.container}>
              {gamesItems.map(item => (
                <div key={item._id} style={styles.card} className="card">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    style={styles.image}
                  />
                  <div style={styles.offer}>{item.offer}%</div>
                  <div style={styles.name}>{item.name}</div>
                  <div style={styles.detail}><s>₹{item.price}</s></div>
                  <div style={styles.detail}>₹{item.offerPrice}</div>
                  <button id="bb1b" onClick={() => navigate("/buynow", { state: { product: item } })}>BUY NOW</button>
                  <button id="bb2b" onClick={() => handleAddToCart(item)}>add to cart</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>No products found in the "Games" category.</div>
        )}
      </div> <br />
      <div id="footerr">
        {showFoot && <Footer />}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '50px',
    backgroundColor: 'black',
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
  },
  image: {
    width: "200px",
    height: "200px",
    marginBottom: "10px",
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
  }
};

export default Games;
