import React from 'react';
import "./all.css";
import Payment from './Payment';
import { Link } from 'react-router-dom';

const Rdr2 = () => {
    return (<div className="product-container">
        <div className="product-header">
            <h1>🎮GAMERZ HUT</h1>

        </div>
        <div className="product-content"> <div className="product-gallery"> <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/21628b85-4d4b-4156-9b46-d2bdcf71eabe.jpg" alt="Red Dead Redemption 2" className="main-image" />
            <div className="thumbnail-container"> <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/screenshot/92ff20c5-4dbb-4130-ad91-fc01258f3906.jpg" alt="Thumbnail 1" className="thumbnail" />
                <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/screenshot/6a15d6e4-db5e-49db-8640-78a64f03477a.jpg" alt="Thumbnail 2" className="thumbnail" />
                <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/screenshot/3cd1bedc-0d90-43b6-b272-97b7a8cd37ae.jpg" alt="Thumbnail 3" className="thumbnail" /> </div>
        </div>
            <div className="product-details"> <h2>Red Dead Redemption 2</h2> <p className="brand">Rockstar</p>
                <p className="price">₹2199 <span className="old-price">₹4500</span></p>
                <p className="release-date">Released on: 26 oct 2018</p>
                <label>Edition:</label> <select> <option>Standard</option> <option>Deluxe</option> </select>
                <label>Platform:</label> <select> <option>PS5</option> <option>PC</option> <option>Xbox</option> </select>
                <button className="add-to-cart">+ ADD TO CART</button>
                <button className="buy-now"> <Link to="/pay" className="nav-link">BUY NOW</Link></button> </div> </div> </div>);
};

export default Rdr2;