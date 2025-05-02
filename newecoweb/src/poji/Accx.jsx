import { useState } from "react";
import './pages.css'
import { Link } from 'react-router-dom';
import App from "../App";
import Nav from "./Nav";



    const apages = [
        { offer: "6% off",
          name: "Sony Playstation 5 Official Dual Sense Controller White", 
          icon: "https://sgp1.digitaloceanspaces.com/relay-bl-in-records/GameNation/EA_1086", 
          description: "₹5999" ,
          path: '/gtav',
          cut: "₹6399 ",
        },
        {  offer:"37% off",
          name: "Sony Official PlayStation 5 Pulse 3D Wireless Headset White", 
          icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_1087", 
          description: "₹5199" ,
          path: "/rdr2 off",
          cut:"₹8299",
        },
        { offer:"",
          name: "Sony Official Playstation 5 Dual Sense Controller Charging Station", 
          icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_1091", 
          description: "₹2250" ,
          path: "",
          cut:"3350",
        },
        { offer:"38%",
            name: "Sony Official PlayStation 5 Pulse 3D Wireless Headset Midnight Black", 
            icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_1714", 
            description: "₹4999" ,
            path: "",
            cut:"₹7999",
          }
      ];
      
      const Accx = ({ showNav = true , showFoot = true }) => {
        const [hoveredIndex, setHoveredIndex] = useState(null);
  return ( 
    <div>
    <div>   {showNav && <Nav />} </div>
    <div id="all1">

<div style={styles.container} id="con1">
  {apages.map((apages, index) => {
    let initialX = 0;
    let delay = 0;


    return ( 
   
      <div
    
        style={{
          ...styles.apagesBox,
          ...(hoveredIndex === index ? styles.apagesBoxHover : {}),
        }}
        className="apagesbox"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}

      >  
  
        <img src={apages.icon} alt={apages.name} style={styles.icon} />
        <p style={styles.apagesoffer} id="offer">{apages.offer} </p>
       <p style={styles.apagesName} > <h3>{apages.name} </h3></p> 
      <h2>  <p style={styles.description}> <h3>{apages.description} </h3></p>  </h2>
       <s> <p style={styles.cut} id="cut">{apages.cut}</p> </s> 
        <button id="bb1b">
        <Link to={apages.path} style={{ textDecoration: "none", color: "black" }}>BUY NOW</Link>
</button>
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
    apagesBox: {
      width: "210px",
      height: "430px",
      backgroundColor: "  rgb(255, 255, 255)",
      padding: "15px",
     
      borderRadius: "8px",
      textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgb(0, 0, 0)",
    },
    apagesBoxHover: {
      boxShadow: "0px 0px 15px rgb(255, 255, 255)",
      transform: "scale(1.1)",
    },
    icon: {
      width: "200px",
      height: "200px",
      marginBottom: "10px",
    },
  
    apagesName: {
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

export default Accx

