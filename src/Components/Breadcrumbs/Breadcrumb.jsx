import React from "react";
import "./Breadcrum.css";

import arrow_icon from "../Assets/breadcrum_arrow.png";

const Breadcrumbs = (props) => {
  const { product } = props;

  // Check if product exists and has category property
  // if (!product || !product.category) {
  //   return null; // If product or category does not exist, return null
  // }

  return (
    <div className="breadcrum">
      HOME
      <img src={arrow_icon} alt="" />
      SHOP <img src={arrow_icon} alt="" />
      {product.category} <img src={arrow_icon} alt="" />
      {product.name}
    </div>
  );
};

export default Breadcrumbs;
