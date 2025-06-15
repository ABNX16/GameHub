import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_BACKEND_URL;

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
      <h2 style={styles.title}>Welcome, {userData.name}</h2>
      <div style={styles.infoBox}>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone:</strong> {userData.phone}</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    minHeight: "100vh"
  },
  title: {
    fontSize: "28px",
    marginBottom: "20px",
    color: "#333"
  },
  infoBox: {
    backgroundColor: "#fff",
    padding: "20px",
    display: "inline-block",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    borderRadius: "8px",
    color: "#555",
    fontSize: "18px"
  },
  loading: {
    textAlign: "center",
    marginTop: "60px",
    fontSize: "20px",
    color: "#666"
  }
};

export default Profile;
