import React, { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShopContext = createContext(null);

// const getDefaultCart = () => {
//   let cart = {};
//   for (let index = 0; index <= 300; index++) {
//     cart[index] = 0;
//   }
//   return cart;
// };

const ShopContextProvider = (props) => {
  const [all_product, setAll_Product] = useState([]);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/allproducts")
      .then((response) => response.json())
      .then((data) => setAll_Product(data))
      .catch((error) => console.error("Error fetching products:", error));

    if (localStorage.getItem("auth-token")) {
      // .catch((error) => console.error("Error fetching products:", error));
      fetch("http://localhost:4000/getcart", {
        method: "POST",
        headers: {
          Accept: "application/json", // Changed from "application/form-data" to "application/json"
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}), // Ensure the body is a valid JSON
      })
        .then((response) => response.json())
        .then((data) => setCartItems(data))
        .catch((error) => console.error("Error fetching cart data:", error));
    }
  }, []); // Added an empty dependency array to run this effect once

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/addtocart", {
        method: "POST",
        headers: {
          Accept: "application/form-data",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then(toast.success("Added to Cart"))
        //.then((data) => console.log(data))
        .catch((error) => console.error("Error adding to cart:", error));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 0) {
        newCartItems[itemId] -= 1;
      }
      return newCartItems;
    });
    if (localStorage.getItem("auth-token")) {
      fetch("http://localhost:4000/removefromcart", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": `${localStorage.getItem("auth-token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId: itemId }),
      })
        .then((response) => response.json())
        .then(toast.success("Removed from Cart"))
        .then((data) => console.log(data))
        .catch((error) => console.error("Error removing from cart:", error));
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((product) => product._id === item);
        if (itemInfo) {
          // Ensure itemInfo is defined before accessing properties
          totalAmount += cartItems[item] * itemInfo.new_price;
        } else {
          console.warn(`Product with ID ${item} not found in all_product`);
          // Handle this case, such as showing an error or using a default price
        }
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
