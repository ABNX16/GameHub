import { useState, useEffect } from "react";
import './pages.css';
import { Link } from 'react-router-dom';
import Nav from "./Nav";
import axios from "axios";

function Page({ showNav = true, showFoot = true }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/user/products')
      .then(response => {
        setItems(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load products.');
        setLoading(false);
      });
  }, []);

 
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/user/products/${id}`)
      .then(() => {
        setItems(prev => prev.filter(item => item._id !== id));
      })
      .catch(err => console.error("Delete error:", err));
  };

  const handleUpdate = (id) => {
    
    console.log("Update clicked for:", id);
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
                  {/* <div style={styles.heading}>{category} on sale</div> */}
                  <div style={styles.container}>
                    {groupedItems[category].map(item => (
                      <div key={item._id} style={styles.card}>
                       <img
                        src={`http://localhost:5000${item.image}`}
                        alt={item.name}
                        style={styles.image}
                      />
                        <div style={styles.offer}>{item.offer}%</div>
                        <div style={styles.name}>{item.name}</div>
                        <div style= {styles.detail}> <s>₹{item.price} </s></div>
                        <div style={styles.detail}>₹{item.offerPrice}</div>
                        <button id="bb1b" >  BUY NOW </button>
                        <button id="bb2b" > add to cart</button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>No products found.</div>
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
  },
  productId: {
    display: 'none',
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
  heading: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '20px',
    color: 'white',
    backgroundColor: 'black',
    padding: '10px',
    borderRadius: '5px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    border: '2px solid black',
    borderRadius: '30px',
    backgroundColor: 'white',
    color: 'black',
  
   
  },
  updateButton: {
    marginTop: '10px',
    padding: '8px 15px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#4d94ff',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
export default Page;
