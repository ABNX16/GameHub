import React from "react";
import { useLocation } from "react-router-dom";
import page from "./Pages";



const Purchasesuccess = () => {
  const location = useLocation();
  const game = location.state?.pages || {};

  return (
    <div style={styles.container}>
      <h2>Purchase Successful!</h2>
      <p>You have successfully purchased:THE GAME ENJOY</p>
      {/* <h3>{page.name}</h3>
      
      
      <h3>Paid: {page.price}</h3> */}
      <p>Thank you for your purchase!</p>
    </div>
  );
};

const styles = {
  container: { textAlign: "center", padding: "20px", background: "#000", color: "white" },
  icon: { width: "200px", height: "200px", marginBottom: "10px" }
};

export default Purchasesuccess;