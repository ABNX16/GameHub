import { useState } from "react";
import './pages.css';
import { Link } from 'react-router-dom';
import Nav from "./Nav";

const pages = [
  { 
    name: "GTA VI", 
    icon: "https://upload.wikimedia.org/wikipedia/en/4/46/Grand_Theft_Auto_VI.png", 
    
  },
  {  
    name: "Mafia: The Old Country", 
    icon: "https://e2zstore.com/wp-content/uploads/2025/05/mafia-the-old-country.jpg", 
   
  },
  {
    name: "Ghost of Yōtei", 
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbUjRDwp6m7-ACLDmN0JpUdy8LUC2OxCOFg&s", 
    description: "this week",
  },
  { 
    name: "APrince of Persia: The Lost Crown", 
    icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/6ef5cd8e-4709-4463-a235-0bb302110678.jpg", 
    description: "coming soon",
  },
  { 
    name: "METAL GEAR SOLID Δ: SNAKE EATER", 
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLyh3yKWETMGTA49b7BgPzQmlNTUWq9eRsTBBdgdxMS0cBOTsnLF9IUnzdUmSVokagaVA&usqp=CAU", 
    description: "coming soon",
  },
];

const Soon = ({ showNav = true, showFoot = true }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div id="dokomo">
      {showNav && <Nav />}

      <div id="all1">
        <div style={styles.container} id="con2">
          {pages.map((page, index) => (
            <div
              key={page.name}
              style={{
                ...styles.pagesBox,
                ...(hoveredIndex === index ? styles.pagesBoxHover : {}),
              }}
              className="pagesbox"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img src={page.icon} alt={page.name} style={styles.icon} />
              <h3 style={styles.pagesName}>{page.name}</h3>
             
              <button id="bb1b">arrive soon</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: "black",
    padding: "0px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "black",
    padding: "40px",
    gap: "50px",
  },
  pagesBox: {
    width: "210px",
    height: "350px",
    backgroundColor: "rgb(255, 255, 255)",
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
    marginBottom: "5px",
  },
  description: {
    fontSize: "12px",
    color: "black",
  },
};

export default Soon;
