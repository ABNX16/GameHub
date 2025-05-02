
import { useState } from "react";
import './pages.css'
import { Link } from 'react-router-dom';
import App from "../App";
import Nav from "./Nav";

const carts = [
    { offer: "9%",
      name: "GTA V", 
      icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/1a3b1a1f-244f-4942-9341-a0ac3f8cf337.jpg", 
      description: "₹1999" ,
      path: '/gta',
      cut: "₹2199 ",
    },
    {  offer:"45%",
      name: "Red Dead Redemption 2", 
      icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/21628b85-4d4b-4156-9b46-d2bdcf71eabe.jpg", 
      description: "₹2199" ,
      path: "/rdr",
      cut:"₹4500",
    },
   
 
  ];
  
  const Cart = ({ showNav = true , showFoot = true }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
return ( 
<div>
<div>   {showNav && <Nav />} </div>
<div id="all1">

<div style={styles.container} id="con1">
{carts.map((carts, index) => {
let initialX = 0;
let delay = 0;

if (carts.name === "GTA V") {
  
} else if (carts.name === "Red Dead Redemption 2") {
 
} 

return ( 

  <div

    style={{
      ...styles.pagesBox,
      ...(hoveredIndex === index ? styles.pagesBoxHover : {}),
    }}
    className="pagesbox"
    onMouseEnter={() => setHoveredIndex(index)}
    onMouseLeave={() => setHoveredIndex(null)}

  >  

    <img src={carts.icon} alt={carts.name} style={styles.icon} />
    <p style={styles.pagesoffer} id="offer">{carts.offer} </p>
   <p style={styles.pagesName} > <h3>{carts.name} </h3></p> 
  <h2>  <p style={styles.description}> <h3>{carts.description} </h3></p>  </h2>
   <s> <p style={styles.cut} id="cut">{carts.cut}</p> </s> 
    <button id="bb11">
    <Link to={carts.path} style={{ textDecoration: "none", color: "black" }}>BUY NOW</Link>
</button > <button id="bb12">REMOVE FROM CART</button>
  </div>
);
})}
</div> 
<div>
</div>
</div>  </div>
)
};

const styles = {

 body:{
  backgroundColor:"black",
  padding:"0px",
  

 },
container: {
  display: "flex",
  flexWrap: "wrap",
  backgroundColor: "black",
  padding: "40px",
  gap: "50px",
  
  
  
  
 
},
heading: {
  textAlign: "center",
  fontSize: "28px",
  
  marginBottom: "20px",
},
pagesBox: {
  width: "210px",
  height: "400px",
  backgroundColor: "  rgb(255, 255, 255)",
  padding: "15px",
 
  borderRadius: "8px",
  textAlign: "center",
  transition: "transform 0.3s, box-shadow 0.3s",
  cursor: "pointer",
  boxShadow: "0 4px 10px rgb(0, 0, 0)",
},
pagesBoxHover: {
  boxShadow: "0px 0px 15px rgb(255, 255, 255)",
  transform: "scale(1.1)",
},
icon: {
  width: "200px",
  height: "200px",
  marginBottom: "10px",
},

pagesName: {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#00aaff",
  // color: "rgb(8, 95, 36)",
  marginBottom: "5px",
},
description: {
  fontSize: "12px",
  color: "black",
},

}

export default Cart

