import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById('razorpay-script')) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.id = 'razorpay-script';
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function BuyNow() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product || {};
  const offerPrice = product?.offerPrice || product?.price || 0;

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    pincode: '',
    street: '',
    city: '',
    district: '',
    state: '',
    landmark: '',
    price: offerPrice
  });

  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);

  useEffect(() => {
    loadRazorpayScript().then((loaded) => {
      setIsRazorpayLoaded(loaded);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddtoorder = async (e, paymentMethod) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert('Please login first');

    if (paymentMethod === 'ONLINE' && !isRazorpayLoaded) {
      alert("Payment SDK not loaded yet. Please wait.");
      return;
    }

    const orderData = {
      ...formData,
      userEmail,
      productId: product._id,
      productName: product.name,
      image: product.image,
      paymentMethod
    };

    if (paymentMethod === 'COD') {
      try {
        await axios.post('http://localhost:5000/order/create', orderData);
        alert("Order Placed Successfully!");
        navigate('/ordersuccess', { state: { product } });
      } catch (err) {
        console.error("Order placement failed:", err);
        alert("Something went wrong. Please try again.");
      }
    } else {
      try {
        const { data } = await axios.post('http://localhost:5000/order/razorpay', {
          amount: offerPrice * 100,
          userEmail
        });

        const options = {
          key: 'rzp_test_fdG8DmzbF0mtAi',
          amount: data.order.amount,
          currency: "INR",
          name: "GAMEHUB",
          description: product.name,
          image: "/imh11.png",
          order_id: data.order.id,
          handler: async function (response) {
            try {
              await axios.post('http://localhost:5000/order/create', {
                ...orderData,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              });
              alert("Payment Successful & Order Placed!");
              navigate('/ordersuccess', { state: { product } });
            } catch (err) {
              console.error("Order creation after payment failed:", err);
              alert("Payment succeeded but order creation failed. Contact support.");
            }
          },
          prefill: {
            name: formData.name,
            email: formData.email,
            contact: formData.number,
          },
          theme: {
            color: "#27ae60"
          }
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Payment failed:", err);
        alert("Payment failed. Please try again.");
      }
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.leftPanel}>
          <img src={`http://localhost:5000${product.image}`} alt={product.name} style={styles.image} />
          <h2 style={styles.productName}>{product.name}</h2>
          <p style={styles.price}>₹{offerPrice}</p>
        </div>

        <div style={styles.form}>
          <h2 style={styles.title}>Checkout</h2>

          <section style={styles.section}>
            <h4>Personal Information</h4>
            <input name="name" type="text" placeholder="Full Name" onChange={handleChange} style={styles.input12} />
            <input name="number" type="tel" placeholder="Phone Number" onChange={handleChange} style={styles.input12} />
            <input name="email" type="email" placeholder="Email Address" onChange={handleChange} style={styles.input12} />
          </section>

          <section style={styles.section}>
            <h4>Shipping Address</h4>
            <input name="street" type="text" placeholder="House No. / Name" onChange={handleChange} style={styles.input12} />
            <input name="city" type="text" placeholder="City" onChange={handleChange} style={styles.input12} />
            <input name="district" type="text" placeholder="District" onChange={handleChange} style={styles.input12} />
            <select name="state" onChange={handleChange} style={styles.input12} value={formData.state}>
              <option value="">Select State</option>
              {indianStates.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <input name="landmark" type="text" placeholder="Landmark" onChange={handleChange} style={styles.input12} />
            <input name="pincode" type="text" placeholder="PIN Code" onChange={handleChange} style={styles.input12} />
          </section>

          <section style={styles.section}>
            <h4>Payment</h4>
            <input
              type="number"
              name="price"
              value={formData.price}
              readOnly
              style={{
                ...styles.input12,
                backgroundColor: '#222',
                color: 'white',
                fontWeight: 'bold'
              }}
            />
            <div style={styles.buttonGroup}>
              <button style={styles.codButton} onClick={(e) => handleAddtoorder(e, 'COD')}>Cash on Delivery</button>
              <button
                style={styles.payButton}
                onClick={(e) => handleAddtoorder(e, 'ONLINE')}
                disabled={!isRazorpayLoaded}
                title={!isRazorpayLoaded ? "Loading Payment Gateway..." : "Pay Now"}
              >
                Pay Now
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#32cd32"
  },
  container: {
    display: 'flex',
    width: '90%',
    maxWidth: '1100px',
    backgroundColor: '#1B1B1B',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  leftPanel: {
    flex: '1',
    backgroundColor: '#272727',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRight: '2px solid #32cd32',
  },
  image: {
    width: '220px',
    height: '220px',
    borderRadius: '10px',
    objectFit: 'cover',
    marginBottom: '20px',
  },
  productName: {
    fontSize: '22px',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: '10px',
    color: 'white',
  },
  price: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
  },
  form: {
    flex: '2',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    color: 'white',
  },
  title: {
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#32cd32',
    textShadow: '0 0 3px rgba(46, 204, 113, 0.3)',
  },
  section: {
    marginBottom: '25px',
    color: 'white',
  },
  input12: {
    width: '100%',
    padding: '12px 14px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1.5px solid rgb(58, 58, 58)',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: '#222',
    color: 'white',
    transition: 'border-color 0.3s ease',
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '15px',
  },
  codButton: {
    flex: 1,
    padding: '14px 0',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#32cd32',
    color: '#222',
    transition: 'background-color 0.3s ease',
  },
  payButton: {
    flex: 1,
    padding: '14px 0',
    borderRadius: '8px',
    border: 'none',
    fontWeight: '600',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#32cd32',
    color: '#222',
    transition: 'background-color 0.3s ease',
  }
};

export default BuyNow;
