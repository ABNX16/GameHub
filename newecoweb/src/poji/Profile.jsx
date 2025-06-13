import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      alert("Unauthorized. Please login.");
      navigate('/'); // redirect to login
      return;
    }

    axios.get("http://localhost:5000/userlist/profile", {
      headers: {
        Authorization: token
      }
    })
    .then((res) => {
      setUserData(res.data);
    })
    .catch((err) => {
      console.error(err);
      alert("Invalid token or session expired.");
      navigate('/');
    });
  }, [navigate]);

  if (!userData) return <p>Loading profile...</p>;

  return (
    <div>
      <h2>Welcome, {userData.name}</h2>
      <p>Email: {userData.email}</p>
      <p>Phone: {userData.phone}</p>
    </div>
  );
}

export default Profile;
