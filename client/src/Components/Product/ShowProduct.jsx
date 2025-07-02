import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import ProductCard from "./ProductCard";

const ShowProduct = () => {
  const { } = useContext(AppContext);
  return (
   <div className="p-4 ">
      <ProductCard  />
    </div>
  );
};

export default ShowProduct;
