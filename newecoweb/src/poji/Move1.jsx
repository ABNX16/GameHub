import React, { useState, useEffect } from "react";
import "./move.css";

const games = [
    { 
        // name:  <img src="https://i.pinimg.com/236x/99/d0/85/99d0856ff30dfc2082d927f859118d8c.jpg"/>, 
        icon: "https://www.psfanatic.com/wp-content/uploads/2020/08/ps5-games-pre-order-amazon-uk.jpg", 
        // description: "Grand Theft Auto V (GTA V) is a 2013 action-adventure game developed by Rockstar North, where players control three protagonists – Michael De Santa, Franklin Clinton, and Trevor Philips – as they navigate the criminal underworld of the fictional state of San Andreas, attempting to pull off heists and survive a ruthless city" ,
        // path: "",
        // cut: "₹2199 ",
      },
      {  
        // name: <img src="https://interfaceingame.com/wp-content/uploads/red-dead-redemption-2/red-dead-redemption-2-logo-500x281.jpg"/>, 
        icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs2A9s0BYRk1bY4DRVmfZ_UlxVcUoyg5YGqTnqH-8rkF1JJV8axfbjroFlJqYK0pU4wNA&usqp=CAU", 
        // description: "After a robbery goes badly wrong in the western town of Blackwater, Arthur Morgan and the Van der Linde gang are forced to flee. With federal agents and the best bounty hunters in the nation massing on their heels, the gang must rob, steal and fight their way across the rugged heartland of America in order to survive." ,
        // path: "",
        // cut:"₹4500",
      },
      {// { offer:"51%",
        // name:<img src=" https://staticctf.ubisoft.com/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/6euY5hlpAn7H1T9BZmpg3V/5491df67dc63daf5bd8d6bb6b764e358/ac-game-logo-mirage.png"/>, 
        icon: "https://cdn.artstation.com/magazine/media/ACM_ArtBlast/008_NataliaMilushko-thumb/ACM_iconic_01_NataliaMilushko.jpg?w=1024", 
        // description: "Assassin's Creed Mirage is a narrative-driven, open-world action-adventure stealth game set in 9th-century Baghdad, where players take on the role of Basim, a street thief seeking answers and justice, and become a master assassin, exploring a vibrant city and uncovering its secrets" ,
        // path: "",
        // cut:"4999",
      },
      {  // { offer:"40%",
        // name:<img src=" https://media.contentapi.ea.com/content/dam/ea/fc/fc-25/images/2024/07/fc25-logo-teaser-16x9-xl.png.adapt.crop1x1.320w.png "/>,  
        icon: "https://ichef.bbci.co.uk/ace/standard/1152/cpsprodpb/616f/live/cce676d0-76a2-11ef-8e77-cdf5cf4ef7b4.jpg", 
        // description: "The game allows the ability to buy players from a marketplace and help build their stats by purchasing items.FC Online have several game modes for the similar to the traditional FC games such as House Rules and VOLTA Live." ,
        // path: "",
        // cut:"2999",
      },
    //   { offer:"45%",
    //     name:<img src=" "/>, 
    //     icon: "https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270", 
    //     description: "₹4999" ,
    //     path: "",
    //     cut:"4200",
    //   },
      // { offer:"55%",
      //   name: <img src=" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1n8rgMAUBEQ3p6qPlLxxCVLBIqqjb_v55dA&s "/>, 
      //   icon: "https://shared.cloudflare.steamstatic.com/store_item_assets/steam/apps/2531310/94b5d8b3165a6fe592e406054b08a2dd24e2f848/capsule_616x353.jpg?t=1742580411", 
      //   description: "The Last of Us is played from a third-person perspective. Players use firearms, improvised weapons, and stealth to defend against hostile humans and cannibalistic creatures infected by a mutated fungus. In the online multiplayer mode, up to eight players engage in cooperative and competitive gameplay." ,
      //   path: "",
      //   cut:"3200",
      // },
    //   { offer:"37%",
    //     name: <img src=" "/>, 
    //     icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/b7e78c70-ee09-4fe6-8a9b-a8cffde22855.jpg", 
    //     description: "₹1499" ,
    //     path: "",
    //     cut:"4099",
    //   }, 
    //   {   offer:"63%",
    //       name: <img src=" "/>, 
    //       icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/0131062a-6813-4311-b339-874d9a66232d.png", 
    //       description: "₹3499" ,
    //       path: "",
    //       cut:"3999",
    //     },
    //     { offer:"50%",
    //       name: <img src=" "/>, 
    //       icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/f967651a-c1b9-4cde-b0fd-eaee2580e056.jpg", 
    //       description: "₹1899" ,
    //       path: "",
    //       cut:"3799",
    //     },
    //     { offer:"54%",
    //       name: <img src=" "/>, 
    //       icon: "https://s3-ap-southeast-1.amazonaws.com/cdn.gamestheshop.com/boxart/fde0daa5-a783-4b6f-8e5c-cbbfae5c36bd.jpg", 
    //       description: "₹2299" ,
    //       path: "",
    //       cut:"4999",
    //     },
];

const Move1= () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? games.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length);
  };

  return (
    <div className="carousel-container" id="cfc">
      <button className="prev" onClick={prevSlide} id="prev">&#10094;</button>
      <div className="carousel-slide" id="c2c">
        <img src={games[currentIndex].icon} alt={games[currentIndex].name} className="carousel-image" />
        <div className="carousel-title">{games[currentIndex].name}</div> 
        <div className="carousel-des" id="121">{games[currentIndex].description}</div> 
       
      </div>
      <button className="next" onClick={nextSlide} id="next">&#10095;</button>
      <div className="dots">
        {games.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? "dot active" : "dot"}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};
export default Move1