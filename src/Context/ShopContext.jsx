import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [loading, setLoading] = useState(true); // State to manage loading status

  // Fetch products from the server
  const getProducts = async () => {
    try {
      const response = await axios.get("/allproducts");
      if (response.data) {
        setAllProduct(response.data);
      } else {
        toast.error("Error fetching products");
      }
    } catch (error) {
      toast.error("Error fetching products: " + error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  // Fetch cart items for the logged-in user
  const getCartProducts = async () => {
    try {
      const response = await axios.post(
        "/getcart",
        {},
        {
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
        }
      );
      if (response.data) {
        setCartItems(response.data);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error("Error fetching cart data: " + error.message);
    }
  };

  useEffect(() => {
    getProducts();

    if (localStorage.getItem("auth-token")) {
      getCartProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  // Add item to the cart
  const addToCart = async (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      toast.error("You need to log in first");
      return;
    }

    try {
      await axios.post(
        "/addtocart",
        { itemId },
        {
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
        }
      );
      setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
      }));
      toast.success("Added to Cart");
    } catch (error) {
      toast.error("Error adding to cart: " + error.message);
    }
  };

  // Remove item from the cart
  const removeFromCart = async (itemId) => {
    if (!localStorage.getItem("auth-token")) {
      toast.error("You need to log in first");
      return;
    }

    try {
      await axios.post(
        "/removefromcart",
        { itemId },
        {
          headers: {
            "auth-token": `${localStorage.getItem("auth-token")}`,
          },
        }
      );
      setCartItems((prev) => {
        const newCartItems = { ...prev };
        if (newCartItems[itemId] > 0) {
          newCartItems[itemId] -= 1;
        }
        return newCartItems;
      });
      toast.success("Removed from Cart");
    } catch (error) {
      toast.error("Error removing from cart: " + error.message);
    }
  };

  // Calculate total amount of items in the cart
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = allProduct.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += cartItems[item] * itemInfo.new_price;
        } else {
          console.warn(`Product with ID ${item} not found in allProduct`);
        }
      }
    }
    return totalAmount;
  };

  // Calculate total number of items in the cart
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
    allProduct,
    cartItems,
    addToCart,
    removeFromCart,
  };

  // Render loading state until data is fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
