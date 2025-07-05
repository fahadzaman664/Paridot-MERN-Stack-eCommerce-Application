import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./AppContext.jsx";
import UserContext from "./UserContext.jsx";
const AppState = (props) => {
  const url = "http://localhost:1000";
  const { token, setToken, setIsAthenticated } = useContext(UserContext);
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProduct] = useState([]);
  const [cart, setCart] = useState([]);
  const [reload, setReload] = useState(false);
  const [latestCart, setLatestCart] = useState([]);
  const [userAddress, setUserAddress] = useState("");
  const [cartSheetOpen, setCartSheetOpen] = useState(false); // 👈 global drawer
  // state
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAthenticated(true);
    }
  }, []); // runs once on mount: loads token

  useEffect(() => {
    if (!token) return; // skip fetch if token not loaded yet
    getUserCart();
    getUserAddress();
  }, [token, reload]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/api/product/getallproducts`, {
          withCredentials: true,
        });

        setProduct(api.data.products);
        setFilteredData(api.data.products);
      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error.response?.data || error.message
        );
      }
    };

    fetchProduct();
  }, [token]);

  //add to cart
  const addToCart = async (title, price, qty, productId, imgSrc) => {
    try {
      const api = await axios.post(
        `${url}/api/cart/addtocart`,
        {
          title,
          price,
          qty,
          productId,
          imgSrc,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      const data = api.data;

      if (data.success) {
        setReload(!reload);
        return { success: true, message: data.message, data: data.cart };
      } else {
        return { success: false, message: data.message || "Login failed." };
      }
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error.response?.data || error.message
      );
    }
  };

  // get user specific cart
  const getUserCart = async () => {
    try {
      const api = await axios.get(`${url}/api/cart/getuserspecificcart`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      const data = api.data;
      if (data.success) {
        setCart(data.cart);
        setLatestCart(data.cart);
      }
    } catch (error) {
      console.error(
        "Failed to add product to cart:",
        error.response?.data || error.message
      );
    }
  };

  // decrease quantity
  const decreaseQuantity = async (productId, qty) => {
    try {
      const api = await axios.post(
        `${url}/api/cart/decreasequantity`,
        { productId, qty },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      setReload(!reload);
      return api.data;
    } catch (error) {
      console.error("Failed to decrease quanity of the product");
    }
  };

  // remove product by id
  const removeProductById = async (productId) => {
    try {
      const api = await axios.delete(
        `${url}/api/cart/removeproductfromcart/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );

      setReload(!reload);
      return api.data;
    } catch (error) {
      console.error("Failed to remove product");
    }
  };

  // clear cart
  const clearCart = async () => {
    try {
      const api = await axios.delete(`${url}/api/cart/clearcart`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      setReload(!reload);
      return api.data;
    } catch (error) {
      console.error("Failed to clear cart");
    }
  };

  // cl
  const shippingAddress = async (
    fullName,
    address,
    city,
    pinCode,
    phoneNumber,
    country,
    state
  ) => {
    try {
      const api = await axios.post(
        `${url}/api/address/addaddress`,
        { fullName, address, city, pinCode, phoneNumber, country, state },
        {
          headers: {
            "Content-Type": "application/json",
            Auth: token,
          },
          withCredentials: true,
        }
      );
      setReload(!reload);
      return api.data;
    } catch (error) {
      console.error("Failed to adding shipping address");
    }
  };

  // get user address
  const getUserAddress = async () => {
    try {
      const api = await axios.get(`${url}/api/address/getaddress`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });

      setUserAddress(api.data.useraddress);
      setReload(!reload);
    } catch (error) {
      console.error(
        "Failed to fetch user address:",
        error.api?.data || error.message
      );
    }
  };

  return (
    <AppContext.Provider
      value={{
        products,
        filteredData,
        setFilteredData,
        addToCart,
        cart,
        setCart,
        setCartSheetOpen,
        cartSheetOpen,
        latestCart,
        lastAddedProduct,
        setLastAddedProduct,
        decreaseQuantity,
        removeProductById,
        clearCart,
        shippingAddress,
        userAddress
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
