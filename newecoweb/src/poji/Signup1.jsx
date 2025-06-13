import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import './sign.css'

const Signup1 = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/userlist", { name, email, phone, password });
      alert("Signup successful");
      localStorage.setItem('token', res.data.token);
      setError("");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div id="sign-body">
      <form id="sign-form" onSubmit={handleSubmit}>
        <div id="sign-heading">Sign Up</div>

        <input
          id="useremail-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          id="username-input"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          id="userphone-input"
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          id="password-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          id="cpassword-input"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <div id="error-message">{error}</div>}

        <button type="submit">Sign Up</button>

        <div className="auth-links">
          <p>Already have an account? <Link to='/'>Sign In</Link></p>
        </div>
      </form>
    </div>
  );
};

export default Signup1;
