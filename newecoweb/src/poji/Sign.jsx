import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './sign.css';

// Use VITE env variable for backend base URL
const baseUrl = import.meta.env.VITE_BACKEND_URL;

function Sign() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin shortcut login
    if (email === 'admin@gamehub.com' && password === '@289777') {
      alert("Admin login successful ✅");
      navigate('/home');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/userlist/login`, {
        email,
        password,
      });

      if (response.data.success) {
        alert("Login successful ✅");
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userEmail', email);
        navigate('/home');
      }
    } catch (err) {
      const msg = err.response?.data?.message;

      if (msg === "Wrong password") {
        alert("Incorrect password. Redirecting to password reset.");
        navigate('/forgot-password');
      } else if (msg === "Email doesn't exist") {
        alert("No account with this email. Please sign up.");
        navigate('/signup');
      } else {
        alert(msg || "Login failed. Try again later.");
      }

      console.error("Login error:", err.response?.data || err.message);
    }
  };

  return (
    <div id="sign-body">
      <form id="sign-form" onSubmit={handleSubmit}>
        <h2 id="sign-heading">Login</h2>

        <input
          id="username-input"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          required
        />

        <input
          id="password-input"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="current-password"
          required
        />

        <button id="login-button" type="submit">Login</button>

        <div className="auth-links">
          <p>Don't have an account? <Link to="/signup">Create one</Link></p>
          <p>Forgot your password? <Link to="/forgot-password">Reset here</Link></p>
        </div>
      </form>

      <div id="ii2">
        <img src="/imh11.png" width={200} height={200} alt="Login Visual" />
      </div>
    </div>
  );
}

export default Sign;
