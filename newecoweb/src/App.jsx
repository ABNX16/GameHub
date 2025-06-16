import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './poji/Home';
import Page from './poji/Pages';
import Nav from './poji/Nav';
import Footer from './poji/Footer';
import Cart from './poji/Cart';
import Sell from './poji/Address';
import Consol from './poji/Consol';

import Admin from './Admin c/Admin';
import Addpro from './Admin c/Addpro';
import Accx from './poji/Accx';
import Move from './poji/Move1';
import Sign from './poji/Sign';
import Allpro from './Admin c/Allpro';
import Games from './poji/Games';
import EditProduct from './Admin c/Editproduct';

import BuyNow from './poji/Buynow';
import Orderlist from './Admin c/OrderList';
import User from './Admin c/User';
import Signup1 from './poji/Signup1';
import ForgotPassword from './poji/ForgotPassword';
import AboutUs from './poji/Aboutus';
import Orders from './poji/Orders';
import SellerP from './poji/Sellerp';
import SellerList from './Admin c/Sellerlist';
import Ordersucc from './poji/Ordersucc';
import Sellsucc from './poji/Sellsucc';
import Visited from './Admin c/Visited';
import Accpet from './Admin c/Accept';

import Profile from './poji/Profile';
import Soon from './poji/Soon';

import AutoLogin from './poji/AutoLogin'; 
import SellUser from './poji/Sellusers';

function App() {
  return (
    <div>
      <Router>
        <AutoLogin/>
        <Routes>
          <Route path="/" element={<Sign />} />
          <Route path="/home" element={<Home />} />
          <Route path="/page" element={<Page />} />
          <Route path="/games" element={<Games />} />
          <Route path="/nav" element={<Nav />} />
          <Route path="/move" element={<Move />} />
          <Route path="/soon" element={<Soon />} />
          <Route path="/foot" element={<Footer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/consol" element={<Consol />} />
          <Route path="/sellsucc" element={<Sellsucc />} />
          <Route path="/visited" element={<Visited />} />
          <Route path="/accpet" element={<Accpet />} />
          <Route path="/admin12" element={<Admin />} />
          <Route path="/addpro" element={<Addpro />} />
          <Route path="/accx" element={<Accx />} />
          <Route path="/Allpro" element={<Allpro />} />
          <Route path="/admin/edit/:id" element={<EditProduct />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/orderlist" element={<Orderlist />} />
          <Route path="/signup" element={<Signup1 />} />
          <Route path="/users" element={<User />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/sellerp" element={<SellerP />} />
          <Route path="/sellerlist" element={<SellerList />} />
          <Route path="/ordersuccess" element={<Ordersucc />} />
          <Route path="/selluser" element={<SellUser />} />
          <Route path="/prodile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
