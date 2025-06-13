import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './sign.css';

function Sign() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Admin shortcut (optional)
  const correctUsername = 'admin@gamehub.com';
  const correctPassword = '@289777';

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Admin login shortcut
    if (username === correctUsername && password === correctPassword) {
      alert("Admin login successful");
      navigate('/admin12');
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/userlist/login", {
        email: username,
        password: password
      });

      if (res.data.success) {
        alert("Login successful");
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userEmail', username);
        navigate('/home');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        const msg = err.response.data.message;

        if (msg === "Wrong password") {
          alert("Password is wrong, please reset the password");
          navigate('/forgot-password');
        } else if (msg === "Email doesn't exist") {
          alert("No account with this email");
          navigate('/signup');
        } else {
          alert(msg || "Login failed");
        }
      } else {
        console.error("Unexpected login error:", err);
        alert("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div id="sign-body">
      <form id="sign-form" onSubmit={handleSubmit}>
        <h2 id="sign-heading">Login</h2>

        <input
          id="username-input"
          type="email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          id="password-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button id="login-button" type="submit">Login</button>

        <div className="auth-links">
          <p>Don't have an account? <Link to='/signup'>Create new account</Link></p>
          <p>Forgot your password? <Link to='/forgot-password'>Reset password</Link></p>
        </div>
      </form>

      <div id='ii2'>
        <img src='/imh11.png' width={200} height={200} alt="login illustration" />
      </div>
    </div>
  );
}

export default Sign;
