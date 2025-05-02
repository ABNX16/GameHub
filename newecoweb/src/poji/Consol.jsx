import { useState } from "react";
import './pages.css'
import { Link } from 'react-router-dom';
import App from "../App";
import Nav from "./Nav";



    const cpages = [
        { offer: "30% off",
          name: "Sony PlayStation 5 Standard Edtion 825 GB", 
          icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_976", 
          description: "₹36999" ,
          path: '',
          cut: "₹52999",
        },
      
        {  offer:"no offers",
            name: "Sony PlayStation 5 Digital Edition 825 GB ", 
            icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_977", 
            description: "₹44990" ,
            path: "",
            cut:"",
          },{  offer:"13% off",
            name: "Sony PlayStation 5 Slim Disc Edition 1TB", 
            icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_976", 
            description: "₹41990" ,
            path: "",
            cut:"47999",
          },
          {  offer:"36% off",
            name: "Sony PlayStation 4 slim  1 TB jet black ", 
            icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_990", 
            description: "₹17999" ,
            path: "",
            cut:"27999",
          }, 
          {  offer:"32% off",
            name: "Sony PlayStation 4 Standard 1 TB Jet Black ", 
            icon: "https://relay-bl-in-records.sgp1.cdn.digitaloceanspaces.com/GameNation/EA_990", 
            description: "₹16999" ,
            path: "",
            cut:"24999",
          },
      ];
      
      const Consol = ({ showNav = true , showFoot = true }) => {
        const [hoveredIndex, setHoveredIndex] = useState(null);
  return (  
    <>
    {showNav && <Nav />} 
    <div> 
    <div>   </div>
    <div id="all1">

<div style={styles.container} id="con1">
  {cpages.map((cpages, index) => {
    let initialX = 0;
    let delay = 0;

    if (cpages.name === "Sony PlayStation 5 Standard Edtion 825 GB") {
      
    } else if (cpages.name === "Sony PlayStation 4 Standard 1 TB Jet Black"){}
    else if (cpages.name === "Sony PlayStation 4 slim  1 TB jet black "){}
    else if (cpages.name === "Sony PlayStation 5 Slim Disc Edition 1TB "){}
    else if (cpages.name === "Sony PlayStation 5 Digital Edition 825 GB "){}
    


    return ( 
   
      <div
    
        style={{
          ...styles.cpagesBox,
          ...(hoveredIndex === index ? styles.cpagesBoxHover : {}),
        }}
        className="cpagesbox"
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}

      >  
  
        <img src={cpages.icon} alt={cpages.name} style={styles.icon} />
        <p style={styles.cpagesoffer} id="offer">{cpages.offer} </p>
       <p style={styles.cpagesName} > <h3>{cpages.name} </h3></p> 
      <h2>  <p style={styles.description}> <h3>{cpages.description} </h3></p>  </h2>
       <s> <p style={styles.cut} id="cut">{cpages.cut}</p> </s> 
        <button id="bb1b">
        <Link to={cpages.path} style={{ textDecoration: "none", color: "black" }}>BUY NOW</Link>
</button>
      </div>
    );
  })}
</div> 
<div>
</div>
    </div>  </div>
    </>
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
    cpagesBox: {
      width: "210px",
      height: "410px",
      backgroundColor: "  rgb(255, 255, 255)",
      padding: "15px",
     
      borderRadius: "8px",
      textAlign: "center",
      transition: "transform 0.3s, box-shadow 0.3s",
      cursor: "pointer",
      boxShadow: "0 4px 10px rgb(0, 0, 0)",
    },
    cpagesBoxHover: {
      boxShadow: "0px 0px 15px rgb(255, 255, 255)",
      transform: "scale(1.1)",
    },
    icon: {
      width: "200px",
      height: "200px",
      marginBottom: "10px",
    },
  
    cpagesName: {
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

export default Consol

