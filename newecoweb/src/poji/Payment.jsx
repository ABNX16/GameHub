import React, { useState } from "react";
import "./payment.css";
import { Link } from "react-router-dom";

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const handlePayment = () => {
    if (paymentMethod === "credit-card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please fill in all card details.");
      return;
    }
    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter your UPI ID.");
      return;
    }
    alert("Purchase Successful!");
  };

  return (
    <div className="payment-container">
      <h2 className="payment-title">Payment Portal</h2>
      <div className="payment-options">
        <label>
          <input
            type="radio"
            value="credit-card"
            checked={paymentMethod === "credit-card"}
            onChange={() => setPaymentMethod("credit-card")}
          />
          Credit Card
        </label>
        <label>
          <input
            type="radio"
            value="upi"
            checked={paymentMethod === "upi"}
            onChange={() => setPaymentMethod("upi")}
          />
          UPI
        </label>
      </div>
      {paymentMethod === "credit-card" && (
        <div className="card-details">
          <input
            type="text"
            placeholder="Card Number"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      )}
      {paymentMethod === "upi" && (
        <div className="upi-details">
          <input
            type="text"
            placeholder="Enter UPI ID"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      )}
      <button className="pay-button" onClick={handlePayment}>Proceed to Payment</button>
    </div>
  );
};

export default Payment;