import React from 'react';
import "./all.css";
import Payment from './Payment';
import { Link } from 'react-router-dom';

const Gta = () => {
    return ( 
       <div id='boddy'>
    <div className="product-container">
        <div className="product-header">
            <h1>🎮GAMERZ HUT</h1>

        </div>
        <div className="product-content"> <div className="product-gallery"> <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/1a3b1a1f-244f-4942-9341-a0ac3f8cf337.jpg" alt="GTA V" className="main-image" />
            <div className="thumbnail-container"> <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/screenshot/20f8050b-c2b9-4db0-867d-9872f50c1e00.jpg" alt="Thumbnail 1" className="thumbnail" />
                <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/screenshot/720ae092-766c-4032-a69e-ec5c69f8f818.jpg" alt="Thumbnail 2" className="thumbnail" />
                <img src="https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/screenshot/430b30a4-3d3e-49bc-9d9d-b61e1e2fd5eb.jpg" alt="Thumbnail 3" className="thumbnail" /> </div>
        </div>
            <div className="product-details"> <h2>GTA V</h2> <p className="brand">Rockstar</p>
                <p className="price">₹1999 <span className="old-price">₹2199</span></p>
                <p className="release-date">Released on: 17 sept 2013</p>
                <label>Edition:</label> <select> <option>Standard</option> <option>Deluxe</option> </select>
                <label>Platform:</label> <select> <option>PS5</option> <option>PC</option> <option>Xbox</option> </select>
                <button className="add-to-cart">+ ADD TO CART</button>
                <button className="buy-now"> <Link to="/pay" className="nav-link">BUY NOW</Link></button> </div> </div> </div> </div>);
};

export default Gta;