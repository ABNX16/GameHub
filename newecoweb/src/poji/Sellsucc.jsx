import React from "react";
import { useNavigate } from "react-router-dom";
import './sellp.css';
import Nav from "./Nav";

const Sellsucc = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      <div className="confirmation-container34">
        <div className="confirmation-card34">
          <div className="icon-circle34">
            <span className="checkmark34">✓</span>
          </div>

          <h2 className="success-title">Thank You!</h2>
          <p className="message34">
            Your product has been submitted successfully.
            <br /><br />
            Our team will contact you shortly to verify your product and may visit your provided address for inspection.
          </p>

          <div className="button-group34">
            <button
              className="continue-shopping34"
              onClick={() => navigate('/home')}
            >
              GO TO HOME
            </button>

            <div className="support-section34">
              <p>Need help?</p>
              <a href="mailto:support@gamezhut.com" id="wha">📧 Email Support</a>
              <a href="https://wa.me/919947863233" target="_blank" rel="noopener noreferrer" id="wha">💬 WhatsApp Support</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sellsucc;
