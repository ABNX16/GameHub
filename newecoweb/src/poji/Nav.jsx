// import React, { useState } from "react";
// import "./nav.css";
// import { Link } from "react-router-dom";
// import Soon from "./Soon";

// const games = [
//   { name: "GTA V", path: "/gta" },
//   { name: "Red Dead Redemption 2", path: "/rdr" },
//   { name: "Assassin's Creed Mirage", path: "/acmirage" },
//   { name: "EAFC 25", path: "/eafc25" },
//   { name: "Minecraft", path: "/minecraft" },
//   { name: "The Last of Us", path: "/tlou" },
//   { name: "Marvel's Spider-Man", path: "/spiderman" },
//   { name: "Far Cry 6", path: "/farcry6" },
//   { name: "Spider-Man: Miles Morales", path: "/milesmorales" },
//   { name: "WWE 2K24", path: "/wwe2k24" },
// ];

// function Nav() {
//   const [query, setQuery] = useState("");
//   const filteredGames = games.filter((game) =>
//     game.name.toLowerCase().includes(query.toLowerCase())
//   );

//   return (
//     <div>
//       <div id="header">
//         <div id="logo">
//           <h1>🎮 GAMERZ HUT</h1>
//         </div>
//         <div className="search-container">
//           <input
//             type="search"
//             id="sea"
//             placeholder="Search games..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             className="search-bar"
//           />
//           {query && (
//             <ul className="search-results">
//               {filteredGames.length > 0 ? (
//                 filteredGames.map((game, index) => (
//                   <li key={index} className="search-item">
//                     <Link to={game.path} className="search-link">{game.name}</Link>
//                   </li>
//                 ))
//               ) : (
//                 <li className="search-item">No results found</li>
//               )}
//             </ul>
//           )}
//         </div>
        // <div id="navt">
        // <Link to="/" className="nav-link">Home</Link>
        //   <Link to="/page" className="nav-link">Games</Link>
        //   <Link to="/cart" className="nav-link">Carts</Link>
        //   <Link to="sell" className="nav-link">Sell</Link>
        //   <Link to="/soon" className="nav-link">Coming Soon</Link>

        // </div>
//       </div>
//     </div>
//   );
// }

// export default Nav;
import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link } from "react-router-dom";
import './nav.css';

const gamesList = [
  { name: "GTA V", path: "/gta" },
  { name: "Red Dead Redemption 2", path: "/rdr" },
  { name: "Assassin's Creed Mirage", path: "/acmirage" },
  { name: "EAFC 25", path: "/eafc25" },
  { name: "Minecraft", path: "/minecraft" },
  { name: "The Last of Us", path: "/tlou" },
  { name: "Marvel's Spider-Man", path: "/spiderman" },
  { name: "Far Cry 6", path: "/farcry6" },
  { name: "Spider-Man: Miles Morales", path: "/milesmorales" },
  { name: "WWE 2K24", path: "/wwe2k24" },
];

const GameNav = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const filteredGames = gamesList.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav className="navbar">
      <div className="logo">
        <img src='/imh11.png'width={150}height={150} />
        {/* <span className="logo-game">GAME</span>
        <span className="logo-hub">HUB</span> */}
      </div>

      <div className="hamburger-icon" onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <div className={`nav-links ${isMobileMenuOpen ? "mobile-menu-open" : ""}`}>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/page" className="nav-link">Games</Link>
        <Link to="/consol" className="nav-link">Console</Link>
        <Link to="/accx" className="nav-link">Accessories</Link>
        <Link to="/sellpage" className="nav-link">Sell</Link>
       
        <Link to="/soon" className="nav-link">Coming Soon</Link>
      </div>

      <div className="right-icons">
        <div className="search-container">
          <FaSearch className="icon" onClick={() => setIsSearchOpen(!isSearchOpen)} />
          {isSearchOpen && (
            <div className="search-box">
              <input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="search-suggestions">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, index) => (
                    <div key={index} className="suggestion">
                      <Link to={game.path} className="search-link">
                        {game.name}
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="suggestion">No results found</div>
                )}
              </div>
            </div>
          )}
        </div>  <Link to="/cart" className="nav-link">
        <FaShoppingCart className="icon" /> </Link>
        <FaUser className="icon" />
      </div>
    </nav>
  );
};

export default GameNav;
