import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import './ors.css';
import Nav from "./Nav";

const Ordersucc = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product || {};
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

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
                src={`${baseUrl}${product.image}`}
                alt={product.name || "Product"}
                className="product-image"
              />
            )}
            <h3 className="product-name">{product.name || "Product Name"}</h3>
            <p className="product-price">
              ₹{product.offerPrice || product.price || "0"}
            </p>
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
