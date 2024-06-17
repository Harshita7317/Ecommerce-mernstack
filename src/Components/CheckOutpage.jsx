import React from "react";

const CheckOutpage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Thanks for shopping! Visit again</h1>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
    backgroundColor: "#f8f9fa",
    color: "#333",
    textAlign: "center",
  },
  heading: {
    fontSize: "2em",
    fontWeight: "bold",
    margin: "20px 0",
  },
};

export default CheckOutpage;
