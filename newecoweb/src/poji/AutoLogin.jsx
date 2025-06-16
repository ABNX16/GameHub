import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function AutoLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const verifyToken = async () => {
      try {
        const res = await axios.get(`${baseUrl}/userlist/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const currentPath = window.location.pathname;

        if (res.data.success && currentPath === '/') {
          navigate('/home');
        }
      } catch (err) {
        console.error("Auto-login failed:", err.response?.data?.message || err.message);
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
      }
    };

    verifyToken();
  }, [navigate]);

  return null;
}

export default AutoLogin;
