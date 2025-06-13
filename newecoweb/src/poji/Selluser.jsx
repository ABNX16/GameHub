import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderNav from './OrderNav';
import './comsty.css';
import Footer from './Footer';

const SellUser = () => {
  const [allSellers, setAllSellers] = useState([]);
  const [loading, setLoading] = useState(true);
   const userEmail = localStorage.getItem('userEmail');

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sellerRes, visitedRes, acceptRes, rejectRes] = await Promise.all([
           axios.get(`http://localhost:5000/seller/${userEmail}`),
           axios.get(`http://localhost:5000/visited/${userEmail}`),
            axios.get(`http://localhost:5000/accept/${userEmail}`),
             axios.get(`http://localhost:5000/reject/${userEmail}`)
          
          
          

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
  }, []);
  const handleDel = async (seller) => {
    const confirmDelete = window.confirm("Are you sure you visited this address for verification?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/seller/delete/${seller._id}`);
       setAllSellers((prev) => prev.filter(s => s._id !== seller._id));
      } catch (error) {
        console.error('Error updating visited sellers:', error);
      }
    }
  };

  if (loading) return <div className="no-data">Loading seller data...</div>;

  return (
    <>
      <OrderNav />
      <div className="container">
        <h2 className="heading">Your Sellers</h2>
        {allSellers.length === 0 ? (
          <div className="no-data">No seller data available.</div>
        ) : (
          <div className="card-grid">
            {allSellers.map((seller, index) => (
              <div key={index} className="card">
                {seller.productImage && (
                  <img
                    src={`http://localhost:5000/uploads/${seller.productImage}`}
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
                    <div>Address: {seller.address}</div>
                  </div>   {seller.status === 'Pending' && (
                      <button className="button" onClick={() => handleDel(seller)}>
                        Cancel
                      </button>  
                        
                    )}  {seller.status === 'Visited'  &&    (
                       <p> Cancellation only possiable at pending stage</p>
                        
                    )} 
                     {seller.status ===  'Accepted' &&   (
                       <p> product will be collected by our team</p>
                        
                    )}
                     {seller.status === 'Rejected' &&   (
                       <p> due to poor condition or not working perfectly the product has benn rejected</p>
                        
                    )}
                  <div className={`status ${seller.status.toLowerCase()}`}>{seller.status}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div> 
      <div>
      <Footer/></div> 
    </>
  );
};

export default SellUser;
