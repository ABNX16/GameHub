import React, { useState, useEffect } from "react";
import './Sellerp.css';
import axios from "axios";
import Nav from "./Nav";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const SellerP = () => {
  const navigate = useNavigate();
  const baseUrl =import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    email: '',
    street: '',
    city: '',
    district: '',
    state: '',
    landmark: '',
    productName: '',
    category: '',
    purchaseDate: '',
    upiId: ''
  });

  const [file, setFile] = useState(null);
  const [fullAddress, setFullAddress] = useState('');

  useEffect(() => {
    const { street, landmark, city, district, state } = formData;
    if (street && landmark && city && district && state) {
      setFullAddress(`${street}, ${landmark}, ${city}, ${district}, ${state}`);
    }
  }, [formData]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert('Please login first');

    if (!file) return alert('Please upload an image of the product.');

    if (formData.state !== "Kerala") {
      return alert("Only products from Kerala are accepted at the moment.");
    }

    const payload = new FormData();
    Object.entries(formData).forEach(([key, val]) => payload.append(key, val));
    payload.append('userEmail', userEmail);
    payload.append('address', fullAddress);
    payload.append('productImage', file);

    try {
      await axios.post(`${baseUrl}/seller/addsell`, payload, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert("Product submitted successfully!");
      navigate("/sellsucc");

      setFormData({
        name: '', number: '', email: '', street: '', city: '',
        district: '', state: '', landmark: '', productName: '',
        category: '', purchaseDate: '', upiId: ''
      });
      setFile(null);
    } catch (err) {
      console.error("Submission error:", err.response?.data || err.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="seller-container">
        <h2 className="notice-title">Tell us about yourself and product</h2>
        <p className="notice-text">We currently accept products only from <span className="highlight">Kerala</span>.</p>

        <form onSubmit={handleSubmit} className="form-section">
          <fieldset className="fieldset">
            <legend>Personal Info</legend>
            <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
            <input name="number" placeholder="Phone Number" value={formData.number} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
            <input name="street" placeholder="House NO / Name" value={formData.street} onChange={handleChange} required />
            <input name="landmark" placeholder="Landmark" value={formData.landmark} onChange={handleChange} required />
            <input name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
            <input name="district" placeholder="District" value={formData.district} onChange={handleChange} required />
            <select name="state" value={formData.state} onChange={handleChange} required>
              <option value="">Select State</option>
              {indianStates.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend>Product Info</legend>
            <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
            <select name="category" value={formData.category} onChange={handleChange} required>
              <option value="">Select Category</option>
              <option value="Game">Game</option>
              <option value="Console">Console</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input name="purchaseDate" type="date" value={formData.purchaseDate} onChange={handleChange} required />
            <label>Upload Image (Working Condition)</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />
          </fieldset>

          <fieldset className="fieldset">
            <legend>Payment Info</legend>
            <input name="upiId" placeholder="UPI ID" value={formData.upiId} onChange={handleChange} required />
            <p className="note-text">
              This <span className="highlight">UPI ID</span> will be used for payment after product verification.
            </p>
          </fieldset>

          <p className="note-text">
            <span className="highlight">Note:</span> Payment depends on product quality and verification.
          </p>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SellerP;
