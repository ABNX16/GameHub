import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AutoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const verifyToken = async () => {
      try {
        const res = await axios.get('http://localhost:5000/userlist/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        
        if (res.data.success && location.pathname === '/') {
          navigate('/home');
        }
      } catch (err) {
        console.log("Auto-login failed:", err.response?.data?.message || err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
      }
    };

    verifyToken();
  }, []);

  return null;
}

export default AutoLogin;
