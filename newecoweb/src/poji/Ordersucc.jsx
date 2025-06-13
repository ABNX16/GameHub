import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ors.css';
import Nav from "./Nav";

const Ordersucc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {};

  return (
    <div>
      <Nav />
      <div className="confirmation-container">
        <div className="confirmation-card">
          <div className="icon-circle">
            <span className="checkmark">✓</span>
          </div>

          <div className="product-info">
            {product.image && (
              <img
                src={`http://localhost:5000${product.image}`}
                alt={product.name}
                className="product-image"
              />
            )}
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.offerPrice || product.price}</p>
          </div>

          <h2>Thank you for your order!</h2>
          <p>Your order has been placed successfully. We’ll get in touch with shipping details soon.</p>

          <div className="button-group">
            <button
              className="continue-shopping"
              onClick={() => navigate('/home')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ordersucc;
