import React from 'react';
import './ordernav.css';
import Nav from './Nav';
import { Link } from 'react-router-dom'; // Import Link

function OrderNav() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div id='navbody'>
        <nav id='nav33'>
          <Link to="/orders" id='h33'>BUY</Link>
          <Link to="/selluser" id='h45'>SELL</Link>
        </nav>
      </div>
    </div>
  );
}

export default OrderNav;
