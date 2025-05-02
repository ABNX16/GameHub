
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import './Anav.css'




const AdminNav = () => {


  return (
    <div>
   <nav>


  <Link to="/addpro" className="nav-link">ADD PRODUCTES</Link>

   </nav>
   </div>
  );
};

export default AdminNav;
