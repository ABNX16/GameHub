import { useState } from "react";

import { Link } from 'react-router-dom';
import App from "../App";




    const pages = [
        { 
          name: "ADD product", 
          icon: "data:image/png;base64,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", 
           path: '/Addpro',
          
        },
        {  
          name: "EDIT Product", 
          icon: "data:image/png;base64,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", 
        
          path: "/rdr2 off",
         
        },
        { 
          name: "USER LIST", 
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAb1BMVEX///8AAAB/f3/X19enp6crKysnJyfT09ODg4N7e3tXV1dTU1Orq6sGBgb6+vro6Ojv7+/FxcUTExM2NjaOjo5BQUGZmZkNDQ0iIiI8PDxlZWW1tbXf39+enp4aGhpGRkbBwcFpaWldXV1xcXGSkpLXXcKOAAAEqElEQVR4nO2c6ZaiMBBGBdtdUFBxQVz7/Z9x2ordQgg2TpYyfb77y9OjVu4ISVFZOh0AAAAAAAAAAAAAAAAAAAAAAABEkoUji4TZwIVFnG0C62wy6x6zrX2NG6u5XY95z41HEPTsmkxceQTB2KbHyZ1HECQWRcYiRG8UWmR0v3wvFkXWFGFnMQJxoTCpvQB7ChBZ7lC+upSIAs2sBeiKC8va9//Qp0Bda98/gMiLQKQlz0Tmp2m+NxWITyQ5in8qzARiExn9DMdbI30ml8i1lFgYSfaYRKaVFMlEsscjEktPWgaSPR6RXPw16ewvplIxHhG609d0k9PjY18/EI8I/Q5HepndXkb6gXhExn9FhC6tiEZ1vy8tcbP3T3F34vfNHh9+636Tj1bkzCKdouIxqX+uZe3l8cVMIvGx1JpUkQL7IbLfpdX2LD68FFlG9RatpBTYB5FQ3aRqCuyBSN7QpmoKvBy34soo0m/639VLgZ2LiFrwIu8+yBf0N716p3MRukM21RtiTuOjXr3TuQglviPpXWd6l9azu3MR6o6G0ruG+q14D5HMV5G0X+Xgq4gaiNxwLrJrFvGr10oUGaNA8VTyAu5TlOSszJouy1grEOZHWgKRV4FIS5pF4uKYBtEiNDQ1ziaSfM8srJdGAnGJ5KXh5GwiEJNId10eCj8NBGISKdfnvmdK9OAREStUglW4E1eY/HzyH/CILH+aP6BrbKEfiHHGSkyKiFk4/UCMM1Yi2xV1ef1APCLn2x839JJWDhz0A/GIiJ/hVhRK6B456gfiEZmJzmpxHYsXBhbWMI0j58o4sqk/U3lQjSfm5VJ2dKp/zhORfFdejLKeZLX1QV6IdBe1BqXy3JsPIqe1qklSXdsDkX2qblN1/4cHIk1N1EyBnYvc15hfSkv0L2IwCbUCORehxDeqzheK6qPeyhqe2q+8iEbszdBao+lchNosP0iF+q14jxmrT19FVtKOnImvImogcoPnZlejtXPBuUjR6LHRCuQ+RQnVuVa01ds3jGmFlkDkVSDSkmciSTZc5nqT0g/4RApRf1hfzWx/5RKJHyP8xsh5DVwiv63EfhkmkWVlMNwaCMS0W0GM7lH/XhnKlZ99CR4RsXvvOOvEYjWjgf17PCI0KZJSd0U3vV6+SLzHjJW3e6xoDnFFL5dei4iqyW38iPuGUhgeEbFAPv0cTEVh/qr87EswjSPSMTz1+NN2B6I8Fn8wiVQ3kShW1XhQjSf2q1JrUsXOET9EcnnK6jCUs3kfROKLqkVS4uiDiLqydaiaeCCSNbSpmgK/f68lb9N9MNUK5FxEdLzj8oW0F9eR3oIU5yKU+EoLzUSeEmnVIXiK2PJmMXFKil9F7L+9WazwVUQNRG5ApCU1kVGjx9qv7rf5aFO942Hd51rxaapEs26K+ZGWQORVbIv8mSNAZwZ61jbEoq5v71DWjniOMrDT5TmidmnxmNzv3dKTot3xTP9Hcc8XbB5cPGgcyS1g8yjpytGSlrH5g3zdhqvfW2CGheVznuMnS7RMcrR+XnVnWl/Vb5xe7YguK3SLoVUKeyMhAAAAAAAAAAAAAAAAAAAAAAB4xj+QC0YDEZ0RZQAAAABJRU5ErkJggg==", 
          
          path: "",
         
        }
      ];
      
      const page = ({ showNav = true , showFoot = true }) => {
        const [hoveredIndex, setHoveredIndex] = useState(null);
  return ( 
    <div>
  
    <div id="all1">

<div style={styles.container} id="con1">
  {pages.map((pages, index) => {
    let initialX = 0;
    let delay = 0;

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
        {/* <p style={styles.pagesoffer} id="offer">{pages.offer} </p> */}
       <p style={styles.pagesName} > <h3>{pages.name} </h3></p> 
      <h2>  <p style={styles.description}> <h3>{pages.description} </h3></p>  </h2>
       <s> <p style={styles.cut} id="cut">{pages.cut}</p> </s> 
        <button id="bb1b">
        <Link to={pages.path} style={{ textDecoration: "none", color: "black" }}>do it</Link>
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

