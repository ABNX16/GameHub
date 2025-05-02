import { useState } from "react";
import './pages.css'
import { Link } from 'react-router-dom';
import App from "../App";
import Nav from "./Nav";


    const pages = [
        { 
          name: "GTA VI", 
          icon: "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png", 
          description: "coming soon" ,
          
        },
        {  
          name: "Marvel's Spider-Man 2", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/237984ad-b2d6-4a90-9f54-eb549e04fdb5.jpg", 
          description: "next week" ,
          
        },
        {
          name: "Assassin's Creed Shadows", 
          icon: "https://image.api.playstation.com/vulcan/ap/rnd/202404/1815/e67713e008d1cdb83ebf71916c193a5c03ae7e12b85133d2.png", 
          description: "this week" ,
        
        },

       { name: "APrince of Persia: The Lost Crown", 
        icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/6ef5cd8e-4709-4463-a235-0bb302110678.jpg", 
        description: "coming soon" ,},
        { name: "Resident Evil: Village", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/e47f4664-3b41-46df-8eb3-c5c4a5e06105.jpg", 
          description: "coming soon" ,},
       
          
      ];
      
      const Soon = ({ showNav = true , showFoot = true }) => {
        const [hoveredIndex, setHoveredIndex] = useState(null);
  return ( <div id="dokomo"> <div> {showNav && <Nav />} </div>
    <div id="all1">

<div style={styles.container} id="con2">
  {pages.map((pages, index) => {
    let initialX = 0;
    let delay = 0;

    if (pages.name === "GTA VL") {
      
    } else if (pages.name === "Marvel's Spider-Man 2") {
     
    } else if (pages.name === "Assassin's Creed Shadows") {
      
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
  
        <img src={pages.icon} alt={pages.name} style={styles.icon} />
      
       <p style={styles.pagesName} > <h3>{pages.name} </h3></p> 
      <h2>  <p style={styles.description}> <h3>{pages.description} </h3></p>  </h2>
       
        <button id="bb1b">
          arrive soon
</button>
      </div>
    );
  })}
</div> 
<div>
</div>
    </div> </div>
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
      height: "350px",
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

export default Soon

