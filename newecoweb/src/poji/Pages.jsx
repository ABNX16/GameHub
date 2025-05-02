import { useState } from "react";
import './pages.css'
import { Link } from 'react-router-dom';
import App from "../App";
import Nav from "./Nav";



    const pages = [
        { offer: "9% off",
          name: "GTA V", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/1a3b1a1f-244f-4942-9341-a0ac3f8cf337.jpg", 
          description: "₹1999" ,
          path: '/gtav',
          cut: "₹2199 ",
        },
        {  offer:"45% off",
          name: "Red Dead Redemption 2", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/21628b85-4d4b-4156-9b46-d2bdcf71eabe.jpg", 
          description: "₹2199" ,
          path: "/rdr2 off",
          cut:"₹4500",
        },
        { offer:"51% off",
          name: "Assassin's Creed Mirage", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/e17e9a1d-5a41-4751-a33c-b2f5a67632a0.jpg", 
          description: "₹1799" ,
          path: "",
          cut:"4999",
        },
        { offer:"40% off",
          name: "EAFC 25", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/853d50e5-50e4-419f-878d-2a815da88465.jpg", 
          description: "₹4999" ,
          path: "",
          cut:"2999",
        },
        { offer:"45% off",
          name: "Minecraft", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/1df231a4-7e15-4808-aa88-550d5074ca97.jpg", 
          description: "₹4999" ,
          path: "",
          cut:"4200",
        },
        { offer:"55% off",
          name: "The last of us", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/ad18cfc6-a3bb-4d4f-8661-fe521a5073b9.jpg", 
          description: "₹3899" ,
          path: "",
          cut:"3200",
        },
        { offer:"37% off",
          name: "Marvel's spider-man", 
          icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/b7e78c70-ee09-4fe6-8a9b-a8cffde22855.jpg", 
          description: "₹1499" ,
          path: "",
          cut:"4099",
        }, 
        {   offer:"63% off",
            name: "Far Cry 6", 
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/0131062a-6813-4311-b339-874d9a66232d.png", 
            description: "₹3499" ,
            path: "",
            cut:"3999",
          },
          { offer:"50% off",
            name: "Spider-Man: Miles Morales", 
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/f967651a-c1b9-4cde-b0fd-eaee2580e056.jpg", 
            description: "₹1899" ,
            path: "",
            cut:"3799",
          },
          { offer:"54% off",
            name: "WWE 2K24", 
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/fde0daa5-a783-4b6f-8e5c-cbbfae5c36bd.jpg", 
            description: "₹2299" ,
            path: "",
            cut:"4999",
          },
          {
            offer: "48% off",
            name: "God of War",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/eac2a908-3c63-44d0-bf43-ecd456d06daf.jpg",
            description: "₹3999",
            cut: "₹2079",
            path: "/gow"
          },
          {
            offer: "55% off",
            name: "COD: Modern Warfare II",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/11fd0f4f-6a4e-4631-a1ca-e6a135cd007c.jpg",
            description: "₹5999",
            cut: "₹2699",
            path: "/codmw2"
          },
          {
            offer: "52% off",
            name: "Battlefield V",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/269baeed-0bd3-4560-a017-82174b174b0c.jpg",
            description: "₹4999",
            cut: "₹2399",
            path: "/bf2042"
          },
          {
            offer: "40% off",
            name: "Watch Dogs: Legion",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/3422d088-74b3-469b-a98c-aec0d588117f.png",
            description: "₹2999",
            cut: "₹1799",
            path: "/wdl"
          },
          {
            offer: "45% off",
            name: "Ghost of Tsushima",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/3715e450-7b5f-4cd8-b1e2-810b09da6d4d.jpg",
            description: "₹4999",
            cut: "₹2749",
            path: "/tsushima"
          },
          {
            offer: "33% off",
            name: "Death Stranding",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/ee322d2f-9bf9-4bee-a331-4f9d9316c279.jpg",
            description: "₹3299",
            cut: "₹2209",
            path: "/ds"
          },
          {
            offer: "60% off",
            name: "Metro Exodus",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/3791bc65-78b4-4a7c-b909-07d780648b98.jpg",
            description: "₹3499",
            cut: "₹1399",
            path: "/metro"
          },
          {
            offer: "38% off",
            name: "Days Gone",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/a89cedb1-5bbc-4908-8388-3988e63b935d.jpg",
            description: "₹4299",
            cut: "₹2665",
            path: "/daysgone"
          },
          {
            offer: "50% off",
            name: "Hitman 3",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/62cc8988-41b3-4223-b74a-80eb37f441c9.jpg",
            description: "₹3999",
            cut: "₹1999",
            path: "/hitman3"
          },
          {
            offer: "53% off",
            name: "Far Cry 5",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/c3af2175-4400-4408-a20c-07a11a47eae8.jpg",
            description: "₹2999",
            cut: "₹1399",
            path: "/fc5"
          },
          {
            offer: "49%",
            name: "Control: Ultimate Edition",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/0a838f26-0245-4ea6-a963-3cc069be0b6f.jpg",
            description: "₹2699",
            cut: "₹1376",
            path: "/control"
          },
      
          {
            offer: "46% off",
            name: "NBA 2K23",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/e1b538c9-f767-4ef7-9314-ab97fee7058a.jpg",
            description: "₹4299",
            cut: "₹2321",
            path: "/nba23"
          },
         
        
          {
            offer: "43% off",
            name: "Dying Light 2",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/aed229f4-134b-4c0e-9835-65c5f658fc6f.jpg",
            description: "₹4999",
            cut: "₹2849",
            path: "/dl2"
          },
          {
            offer: "57% off",
            name: "Outriders",
            icon: "https://mx2games.com/wp-content/uploads/2021/07/outriders-ps5.jpg",
            description: "₹3799",
            cut: "₹1633",
            path: "/outriders"
          } ,
          {
            offer: "42% off",
            name: "Alan Wake 2",
            icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/ea0f03fb-007b-42df-abfb-785923431c35.png",
            description: "₹3999",
            cut: "₹2319",
            path: "/alanwake2"
          }
      ];
      
      const page = ({ showNav = true , showFoot = true }) => {
        const [hoveredIndex, setHoveredIndex] = useState(null);
  return ( 
    <div>
    <div>   {showNav && <Nav />} </div>
    <div id="all1">

<div style={styles.container} id="con1">
  {pages.map((pages, index) => {
    let initialX = 0;
    let delay = 0;

    if (pages.name === "GTA V") {
      
    } else if (pages.name === "Red Dead Redemption 2") {
     
    } else if (pages.name === "Assassin's Creed Mirage") {
      
    } else if (pages.name === "EAFC 25") {
     
    } else if (pages.name === "Minecraft") {

    } else if (pages.name === "The last of us") {
       
      } else if (pages.name === "Marvel's spider-man") {
        
      }  else if (pages.name === "Far Cry 6") {
        
      }  else if (pages.name === "Marvel's Spider-Man: Miles Morales") {
        
      }  else if (pages.name === "WWE 2K24") {
        
      } else if (pages.name === "God of War") {
      } else if (pages.name === "Call of Duty: Modern Warfare II") {
      } else if (pages.name === "Battlefield V") {
      } else if (pages.name === "Watch Dogs: Legion") {
      } else if (pages.name === "Ghost of Tsushima") {
      } else if (pages.name === "Death Stranding") {
      } else if (pages.name === "Metro Exodus") {
      } else if (pages.name === "Days Gone") {
      } else if (pages.name === "Hitman 3") {
      } else if (pages.name === "Far Cry 5") {
      } else if (pages.name === "Control: Ultimate Edition") {
      } else if (pages.name === "NBA 2K23") {
      } else if (pages.name === "Dying Light 2") {
      } else if (pages.name === "Outriders") {}

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
        <p style={styles.pagesoffer} id="offer">{pages.offer} </p>
       <p style={styles.pagesName} > <h3>{pages.name} </h3></p> 
      <h2>  <p style={styles.description}> <h3>{pages.description} </h3></p>  </h2>
       <s> <p style={styles.cut} id="cut">{pages.cut}</p> </s> 
        <button id="bb1b">
        <Link to={pages.path} style={{ textDecoration: "none", color: "black" }}>BUY NOW</Link>
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
    pagesBox: {
      width: "210px",
      height: "390px",
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

export default page

