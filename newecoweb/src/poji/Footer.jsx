// import React from 'react'
// import "./foot.css"


// function Footer() {
//   return (
//     <div id='a2312'>
//        <div id="footer">
        
//         <p> </p>
       
       
//         <p id='ww1'>&copy;2025Gamezhut.all rights reserved</p>
//         <a href="mailto:aboobackerpnaushad@gmail.com" id='ww'>connect coustmer service through Email 📧</a> 
//         <a href="https://wa.me/919947863233" id='ww2'> connect coustmer service through whatsapp 📲</a>
        
//       </div>
//     </div>
//   )
// }

// export default Footer

import React from 'react';
import './foot.css'; // Ensure you create this CSS file or use inline styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>©2025 Gamezhut. All rights reserved.</p>
        <div className="footer-links">
          <a href="mailto:support@gamezhut.com">Email Support</a>
          <a href="https://wa.me/+919947863233" target="_blank" rel="noopener noreferrer">WhatsApp Support</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
