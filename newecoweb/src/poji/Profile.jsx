import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Unauthorized. Please login.");
      navigate('/');
      return;
    }

    axios.get(`${baseUrl}/userlist/profile`, {
      headers: { Authorization: token }
    })
      .then((res) => {
        setUserData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth error:", err);
        alert("Session expired. Please login again.");
        localStorage.removeItem('token');
        navigate('/');
      });
  }, [navigate, baseUrl]);

  if (loading) {
    return <div style={styles.loading}>Loading profile...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome, {userData?.name || 'User'}</h2>
      <div style={styles.infoBox}>
        <p><strong>Email:</strong> {userData?.email || 'N/A'}</p>
        <p><strong>Phone:</strong> {userData?.phone || 'N/A'}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f0f4f8",
    minHeight: "100vh"
  },
  title: {
    fontSize: "28px",
    marginBottom: "25px",
    color: "#2c3e50"
  },
  infoBox: {
    backgroundColor: "#ffffff",
    padding: "25px 30px",
    display: "inline-block",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px",
    color: "#34495e",
    fontSize: "18px",
    lineHeight: "1.6"
  },
  loading: {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "22px",
    color: "#555"
  }
};

export default Profile;
