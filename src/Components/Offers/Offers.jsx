import React from "react";
import "./Offers.css";
import exclusive_imgae from "../Assets/exclusive_image.png";

const Offers = () => {
  return (
    <div className="offers">
      <div className="offers-left">
        <h1>Exclusive</h1>
        <h1>Offers for you</h1>
        <p>ONLY ON BESTSELLER PRODUCTS</p>
        <button> Check Now</button>
      </div>
      <div className="offers-right">
        <img src={exclusive_imgae} alt="" />
      </div>
    </div>
  );
};

export default Offers;
