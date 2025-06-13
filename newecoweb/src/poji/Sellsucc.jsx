import React from "react";
import { useNavigate } from "react-router-dom";
import './sellp.css';
import Nav from "./Nav";

const Sellsucc = () => {
  const navigate = useNavigate();

  return ( <div> <div> <Nav/></div>
    <div className="confirmation-container34">
      <div className="confirmation-card34">
        <div className="icon-circle34">
          <span className="checkmark34">✓</span>
        </div>

        <h2>Thank You!</h2>
        <p className="message34">
          Your product has been submitted successfully.
          <br /> <br/>
          Our team will contact you soon for verification and for more details by visting the address you provided.
        </p>

        <div className="button-group34">
          <button
            className="continue-shopping34"
            onClick={() => navigate('/home')}
          >
            GO TO HOME
          </button>

          <p id="p222">
            Need help?
            <a href="mailto:support@gamezhut.com" id="wha">Email Support</a>
            <a href="https://wa.me/+919947863233" target="_blank" rel="noopener noreferrer" id="wha">WhatsApp Support</a>
          </p>
        </div>
      </div>
    </div> </div>
  );
};

export default Sellsucc;
