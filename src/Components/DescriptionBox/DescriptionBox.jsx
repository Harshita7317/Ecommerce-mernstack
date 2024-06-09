import React from "react";
import "./DescriptionBox.css";
const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        <p>
          Lorem ipsum dolor sit amet, consect Lorem ipsum dolor sit amet,
          consect Lorem ipsum dolor sit amet, consect Lorem ipsum dolor sit
          amet, consect Lorem ipsum dolor sit amet, consect Lorem ipsum dolor
          sit amet, consect Lorem ipsum dolor sit amet, consect Lorem ipsum
          dolor sit amet, consect Lorem ipsum dolor sit amet, consect Lorem
          ipsum dolor sit amet, consect Lorem ipsum dolor sit amet, consect
          Lorem ipsum dolor sit amet, consect.
        </p>
        <p>
          {" "}
          Lorem ipsum dolor sit amet, consect Lorem ipsum dolor sit amet,
          consect Lorem ipsum dolor sit amet, consect Lorem ipsum dolor sit
          amet, consect Lorem ipsum dolor sit amet, consect Lorem ipsum dolor
          sit amet, consect Lorem ipsum dolor sit amet, consect Lorem ipsum
          dolor sit amet, consect
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
