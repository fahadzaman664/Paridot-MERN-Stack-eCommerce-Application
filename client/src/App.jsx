import React from "react";
import "./index.css";
import ShowProduct from "./Components/Product/ShowProduct.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/Product/ProductDetail";
import Navbar from "./Components/Navbar";
import SearchProduct from "./Components/Product/SearchProduct";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowProduct />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route path="/product/search/:term" element={<SearchProduct />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
