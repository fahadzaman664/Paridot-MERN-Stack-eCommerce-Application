import { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./AppContext.jsx";
const AppState = (props) => {
  const url = "http://localhost:1000";
//  http://localhost:1000/api/product/getallproducts
// ${url}/product/getallproducts
  const [products, setProduct] = useState([]);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/api/product/getallproducts`, {
          withCredentials: true,
        });
       setProduct(api.data.products);

      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error.response?.data || error.message
        );
      }
    };

    fetchProduct();
  }, []);

  return (
    <AppContext.Provider value={{ products}}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppState;
