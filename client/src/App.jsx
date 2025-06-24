import React from "react";
import "./index.css";
import ShowProduct from "./Components/Product/ShowProduct.jsx";
import Home from "./Components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/Product/ProductDetail";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<ShowProduct />}></Route> 
      <Route path="/product/:id" element={<ProductDetail />}></Route>
      </Routes>
   </BrowserRouter>
    </div>
  );
};

export default App;
