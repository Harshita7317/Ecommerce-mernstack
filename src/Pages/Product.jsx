import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../Components/Breadcrumbs/Breadcrumb";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
//import RelatedProducts from "../Components/ProductDisplay/ProductDisplay";

const Product = () => {
  const { allProduct } = useContext(ShopContext);
  const { productId } = useParams();
  // Convert productId to a number
  // const parsedProductId = parseInt(productId);
  const product = allProduct.find((e) => e.id === productId);
  console.log(productId);
  // console.log(e.id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div>
      <Breadcrumbs product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
