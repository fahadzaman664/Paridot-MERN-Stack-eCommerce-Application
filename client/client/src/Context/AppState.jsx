import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
const AppState = (props) => {
  const url = "http://localhost:1000";
//  http://localhost:1000/api/product/getallproducts
// ${url}/product/getallproducts
  const [products, setProduct] = useState('');
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/api/product/getallproducts`, {
          // headers: {
          //   "Content-Type": "application/json",
          // },
          withCredentials: true,
        });
     
       console.log("products", api.data);
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
