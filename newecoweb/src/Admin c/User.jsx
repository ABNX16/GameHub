import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnav from "./AdminNav";
const styles = {
  container: {
    padding: "30px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f0f2f5",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "36px",
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: "30px",
    textAlign: "center",
    textTransform: "uppercase",
    borderBottom: '3px solid #007bff',
    letterSpacing: "1px",
  },
  error: {
    color: "#e74c3c",
    fontWeight: "500",
    marginBottom: "20px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
    borderRadius: "12px",
    overflow: "hidden",
  },
  th: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    textAlign: "center",
    padding: "16px",
    fontWeight: "600",
    fontSize: "16px",
  },
  td: {
    textAlign: "center",
    padding: "16px",
    borderBottom: "1px solid #e0e0e0",
    fontSize: "15px",
    color: "#2c3e50",
    wordBreak: "break-word",
  },
  row: {
    transition: "background 0.3s",
  },
};


const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/userlist`);
        setUsers(res.data.users);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div><Adminnav /></div>
      <div style={styles.container}>
        <h2 style={styles.heading}>User List</h2>
        {error && <p style={styles.error}>{error}</p>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>User-Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Number</th>
              <th style={styles.th}>Password</th>
               <th style={styles.th}>Token</th> 
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} style={styles.row}>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{user.phone}</td>
                <td style={styles.td}>{user.password}</td>

                <td style={styles.td}>{localStorage.getItem('token')}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
