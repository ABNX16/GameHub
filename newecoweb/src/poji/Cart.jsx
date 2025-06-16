import { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "./Nav";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function Cart({ showNav = true, showFoot = true }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem('userEmail');
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!userEmail) {
      setError("Please log in to view your cart.");
      setLoading(false);
      return;
    }

    axios.get(`${baseUrl}/cart/${userEmail}`)
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load cart items.');
        setLoading(false);
      });
  }, [userEmail, baseUrl]);

  const handleRemoveFromCart = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this product from the cart?");
    if (!confirmDelete) return;

    axios.delete(`${baseUrl}/cart/${id}`)
      .then(() => {
        setCartItems(prevItems => prevItems.filter(item => item._id !== id));
      })
      .catch((err) => {
        setError('Failed to remove item from cart.');
        console.error(err);
      });
  };

  return (
    <div>
      {showNav && <Nav />}
      <div style={styles.pageContainer}>
        <h2 style={styles.header}>My Cart</h2>
        {error && <div style={styles.error}>{error}</div>}
        {loading ? (
          <div style={styles.loading}>Loading cart items...</div>
        ) : (
          cartItems.length > 0 ? (
            <div style={styles.cartContainer}>
              {cartItems.map(item => (
                <div key={item._id} style={styles.cartItem}>
                  <img
                    src={`${baseUrl}${item.image}`}
                    alt={item.name}
                    style={styles.image}
                  />
                  <div style={styles.itemDetails}>
                    <div style={styles.productName}>{item.name}</div>
                    <div style={styles.productPrice}>
                      <span style={styles.offerPrice}>₹{item.offerPrice}</span>
                      {item.offerPrice < item.price && (
                        <span style={styles.originalPrice}><s>₹{item.price}</s></span>
                      )}
                    </div>
                    {item.offer && <div style={styles.discountTag}>{item.offer}% OFF</div>}
                  </div>
                  <div style={styles.buttonContainer}>
                    <button
                      style={styles.buyNowButton}
                      onClick={() => navigate("/buynow", { state: { product: item } })}
                    >
                      BUY NOW
                    </button>
                    <button
                      onClick={() => handleRemoveFromCart(item._id)}
                      style={styles.removeButton}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyCartMessage}>Your cart is empty.</div>
          )
        )}
      </div>
      {showFoot && <Footer />}
    </div>
  );
}

const styles = {
  pageContainer: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: 'black',
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white'
  },
  header: {
    fontSize: '2rem',
    marginBottom: '20px'
  },
  error: {
    color: 'red',
    marginBottom: '20px'
  },
  loading: {
    fontSize: '1.2rem'
  },
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  cartItem: {
    display: 'flex',
    backgroundColor: '#1c1c1c',
    padding: '10px',
    borderRadius: '8px',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: '80px',
    height: '80px',
    borderRadius: '8px',
    objectFit: 'cover'
  },
  itemDetails: {
    flex: 1,
    marginLeft: '20px'
  },
  productName: {
    fontSize: '1.1rem',
    fontWeight: 'bold'
  },
  productPrice: {
    display: 'flex',
    gap: '10px'
  },
  offerPrice: {
    color: 'lime',
    fontWeight: 'bold'
  },
  originalPrice: {
    color: 'gray'
  },
  discountTag: {
    color: 'orange',
    fontSize: '0.9rem'
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  buyNowButton: {
    backgroundColor: 'lime',
    color: 'black',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  removeButton: {
    backgroundColor: 'red',
    color: 'white',
    padding: '8px 12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  emptyCartMessage: {
    fontSize: '1.2rem',
    color: 'gray'
  }
};

export default Cart;
