import React, { useState } from 'react';
import './sign.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const userRes = await axios.get("http://localhost:5000/userlist");
      const userList = userRes.data.users;

      const userExists = userList.find((user) => user.email === email);

      if (!userExists) {
        setMessage("No account with this email.");
        return;
      }

      const res = await axios.put("http://localhost:5000/userlist/reset-password", {
        email,
        newPassword: newPass
      });

      if (res.data.success) {
        setMessage("Password updated successfully.");
        setEmail('');
        setNewPass('');
        setConfirmPass('');
      } else {
        setMessage(res.data.message || "Failed to update password.");
      }
    } catch (err) {
      setMessage("Error occurred. Please try again.");
      console.error(err);
    }
  };

  return (
    <div id="sign-body">
      <form id="sign-form" onSubmit={handleReset}>
        <h2 id="sign-heading">Reset Password</h2>

        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          required
        />

        <button type="submit">Reset Password</button>

        {message && <p id="error-message">{message}</p>} 
        <div className="auth-links">
         <p>Already have a acoount? <Link to='/'> SIgn IN</Link></p> </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
