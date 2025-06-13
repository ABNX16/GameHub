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


  useEffect(() => {
    if (!userEmail) {
      setError("Please log in to view your cart.");
      setLoading(false);
      return;
    }

   axios.get(`http://localhost:5000/cart/${userEmail}`)

      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load cart items.');
        setLoading(false);
      });
  }, [userEmail]);

  const handleRemoveFromCart = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to remove this product from the cart?");
    if (!confirmDelete) return;

    axios.delete(`http://localhost:5000/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item._id !== id));
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
                    src={`http://localhost:5000${item.image}`}
                    alt={item.name}
                    style={styles.image}
                  />
                  <div style={styles.itemDetails}>
                    <div style={styles.productName}>{item.name}</div>
                    <div style={styles.productPrice}>
                      <span style={styles.offerPrice}>₹{item.offerPrice}</span>
                      <span style={styles.originalPrice}><s>₹{item.price}</s></span>
                    </div>
                    <div style={styles.discountTag}>{item.offer}% OFF</div>
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
  },
  header: {
    fontSize: '28px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: 'white',
  },
  cartContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '100%',
    maxWidth: '1200px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#D3D3D3',
    borderRadius: '12px',
    padding: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    gap: '20px',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  itemDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: '1',
  },
  productName: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  offerPrice: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'black',
  },
  originalPrice: {
    fontSize: '16px',
    color: 'black',
    textDecoration: 'line-through',
  },
  discountTag: {
    backgroundColor: '#3d550c',
    color: '#fff',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: '10px',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  buyNowButton: {
    padding: '10px',
    backgroundColor: '#0073e6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  removeButton: {
    padding: '8px 15px',
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
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
  emptyCartMessage: {
    textAlign: 'center',
    fontSize: '18px',
    color: '#555',
    marginTop: '40px',
  },
};

export default Cart;
