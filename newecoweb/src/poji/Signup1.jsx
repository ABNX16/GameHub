import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './sign.css';

// Vite-compatible environment variable
const baseUrl = import.meta.env.VITE_BACKEND_URL;

const Signup1 = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, name, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/userlist`, {
        name,
        email,
        phone,
        password,
      });

      alert("Signup successful ✅");
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      setError("");
      navigate("/home"); // Update to your post-signup route
    } catch (err) {
      const msg = err.response?.data?.message || "Signup failed. Try again.";
      console.error("Signup failed:", msg);
      setError(msg);
    }
  };

  return (
    <div id="sign-body">
      <form id="sign-form" onSubmit={handleSubmit}>
        <h2 id="sign-heading">Create Account</h2>

        <input
          id="useremail-input"
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          id="username-input"
          type="text"
          name="name"
          placeholder="Full Name"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          id="userphone-input"
          type="tel"
          name="phone"
          placeholder="Phone Number"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          id="password-input"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          id="cpassword-input"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        {error && <div id="error-message">{error}</div>}

        <button type="submit" id="signup-btn">Sign Up</button>

        <div className="auth-links">
          <p>Already have an account? <Link to="/">Sign In</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup1;
