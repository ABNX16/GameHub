import React, { useState, useEffect } from "react";
import './Sellerp.css';
import axios from "axios";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
  

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const SellerP = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');
  const [landmark, setLandmark] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [file, setFile] = useState(null);
  const [upiId, setUpiId] = useState('');
   const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setFullAddress(`${street}, ${landmark}, ${city}, ${district}, ${state}`);
  }, [street, landmark, city, district, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userEmail = localStorage.getItem('userEmail');
    if (!userEmail) return alert('Please login first');

    if (!file) {
      alert("Please upload a product image.");
      return;
    }

    if (state !== "Kerala") {
      alert("We currently only accept products from Kerala.");
      return;
    }

    const formData = new FormData();
    formData.append('userEmail', userEmail);  
    formData.append('name', name);
    formData.append('number', number);
    formData.append('email', email);
    formData.append('address', fullAddress);
    formData.append('street', street);
    formData.append('landmark', landmark);
    formData.append('city', city);
    formData.append('district', district);
    formData.append('state', state);
    formData.append('productName', productName);
    formData.append('category', category);
    formData.append('purchaseDate', purchaseDate);
    formData.append('upiId', upiId);
    formData.append('productImage', file);

    try {
      const res = await axios.post(`${baseUrl}/seller/addsell`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Product added:', res.data);
      alert('Product added successfully!');
      navigate('/sellsucc');
    } catch (err) {
      console.error('Error:', err.response?.data || err.message);
      alert('Failed to add product.');
    }
  };

  return (
    <div>
      <Nav />
      <div className="seller-container">
        <h2 className="notice-title">Tell us about yourself and product</h2>
        <p className="notice-text">
          Now we only accept products from <span className="highlight">Kerala</span>. And will reject products from elsewhere.
        </p>

        <form onSubmit={handleSubmit} className="form-section">
          <fieldset className="fieldset">
            <legend>Personal Info</legend>
            <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
            <input type="text" placeholder="Phone Number" value={number} onChange={e => setNumber(e.target.value)} required />
            <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
            <input type="text" placeholder="House NO: / Name" value={street} onChange={e => setStreet(e.target.value)} required />
            <input type="text" placeholder="Landmark" value={landmark} onChange={e => setLandmark(e.target.value)} required />
            <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} required />
            <input type="text" placeholder="District" value={district} onChange={e => setDistrict(e.target.value)} required />
            <select value={state} onChange={e => setState(e.target.value)} required>
              <option value="">Select State</option>
              {indianStates.map((s, i) => (
                <option key={i} value={s}>{s}</option>
              ))}
            </select>
          </fieldset>

          <fieldset className="fieldset">
            <legend>Product Info</legend>
            <input type="text" placeholder="Product Name" value={productName} onChange={e => setProductName(e.target.value)} required />
            <select value={category} onChange={e => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              <option value="Game">Game</option>
              <option value="Console">Console</option>
              <option value="Accessories">Accessories</option>
            </select>
            <input type="date" value={purchaseDate} onChange={e => setPurchaseDate(e.target.value)} required />
            <label>Upload Image (Working Condition)</label>
            <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />
          </fieldset>

          <fieldset className="fieldset">
            <legend>Payment Info</legend>
            <input type="text" placeholder="UPI ID" value={upiId} onChange={e => setUpiId(e.target.value)} required />
            <p className="note-text">
              This <span className="highlight">UPI ID</span> will be used for payment after the product passes verification.
            </p>
          </fieldset>

          <p className="note-text">
            <span className="highlight">Please Note:</span> Payment amount is subject to product quality and our assessment guidelines.
          </p>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SellerP;
