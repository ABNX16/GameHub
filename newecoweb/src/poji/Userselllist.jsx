import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderNav from './OrderNav';
import './comsty.css';
import Footer from './Footer';

const Userselllist = () => {
  const [allSellers, setAllSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const userEmail = localStorage.getItem('userEmail');
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellerRes, visitedRes, acceptRes, rejectRes] = await Promise.all([
          axios.get(`${baseUrl}/seller/${userEmail}`),
          axios.get(`${baseUrl}/visited/${userEmail}`),
          axios.get(`${baseUrl}/accept/${userEmail}`),
          axios.get(`${baseUrl}/reject/${userEmail}`)
        ]);

        const sellerData = sellerRes.data.map(item => ({ ...item, status: 'Pending' }));
        const visitedData = visitedRes.data.map(item => ({ ...item, status: 'Visited' }));
        const acceptData = acceptRes.data.map(item => ({ ...item, status: 'Accepted' }));
        const rejectData = rejectRes.data.map(item => ({ ...item, status: 'Rejected' }));

        const combinedData = [...sellerData, ...visitedData, ...acceptData, ...rejectData];
        setAllSellers(combinedData);
      } catch (err) {
        console.error('Error fetching seller data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [baseUrl, userEmail]);

  const handleDelete = async (seller) => {
    const confirmDelete = window.confirm("Are you sure you want to cancel this request?");
    if (confirmDelete) {
      try {
        await axios.delete(`${baseUrl}/seller/delete/${seller._id}`);
        setAllSellers(prev => prev.filter(s => s._id !== seller._id));
      } catch (error) {
        console.error('Error deleting seller:', error);
      }
    }
  };

  if (loading) return <div className="no-data">Loading seller data...</div>;

  return (
    <>
      <OrderNav />
      <div className="container">
        <h2 className="heading">Your Products for Sale</h2>

        {allSellers.length === 0 ? (
          <div className="no-data">No seller data available.</div>
        ) : (
          <div className="card-grid">
            {allSellers.map((seller, index) => (
              <div key={index} className="card">
                {seller.productImage && (
                  <img
                    src={`${baseUrl}/uploads/${seller.productImage}`}
                    alt={seller.productName}
                    className="image"
                  />
                )}

                <div className="info">
                  <div><strong>Product:</strong> {seller.productName}</div>
                  <div><strong>Seller:</strong> {seller.name}</div>
                  <div><strong>Phone:</strong> {seller.number}</div>
                  <div><strong>Email:</strong> {seller.email}</div>
                  <div><strong>Category:</strong> {seller.category}</div>
                  <div><strong>Purchased:</strong> {seller.purchaseDate}</div>
                  <div><strong>UPI:</strong> {seller.upiId}</div>
                  <br />
                  <div className="address-box">
                    <strong>Address:</strong> {seller.address}
                  </div>

                  {seller.status === 'Pending' && (
                    <button className="button" onClick={() => handleDelete(seller)}>
                      Cancel
                    </button>
                  )}

                  {seller.status === 'Visited' && (
                    <p className="info-note">Cancellation is only possible while status is <b>Pending</b>.</p>
                  )}

                  {seller.status === 'Accepted' && (
                    <p className="info-note">Your product has been accepted. It will be collected soon.</p>
                  )}

                  {seller.status === 'Rejected' && (
                    <p className="info-note">
                      Your product was rejected due to poor condition or not working properly.
                    </p>
                  )}

                  <div className={`status ${seller.status.toLowerCase()}`}>{seller.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Userselllist;
