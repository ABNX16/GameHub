
import React, { useState } from 'react';
import {  FaShoppingCart, FaUser, FaBars, FaTimes,FaBox, FaExclamationTriangle, FaArrowLeft, FaArrowAltCircleRight } from 'react-icons/fa';
// import { VscPackage } from "react-icons/vsc";

import { Link } from "react-router-dom";
import './nav.css';


const GameNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
 

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  
  return (
    <nav className="navbar">
      <div className="logo">
        <img src='/imh11.png'width={150}height={150} />
       
      </div>

      <div className="hamburger-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <Link to="/HOME" className="nav-link">Home</Link>
        <Link to="/games" className="nav-link">Games</Link>
        <Link to="/consol" className="nav-link">Console</Link>
        <Link to="/accx" className="nav-link">Accessories</Link>
        <Link to="/sellerp" className="nav-link">Sell</Link>
       
       
       
      </div>

      <div className="right-icons">
       
         <Link to="/cart" className="nav-link">
        <FaShoppingCart className="icon" /> </Link>
         <Link to='/orders' className="nav-link">
          <FaBox className="icon" /> </Link> 
         <Link to='/' className="nav-link">
          <FaArrowAltCircleRight className="icon" /> </Link> 
           
        
      </div>
    </nav>
  );
};

export default GameNav;
