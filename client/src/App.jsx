import React from "react";
import "./index.css";
import ShowProduct from "./Components/Product/ShowProduct.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/Product/ProductDetail";
import Navbar from "./Components/Navbar";
import SearchProduct from "./Components/Product/SearchProduct";
import Register from "./Components/User/Register";
import Login from "./Components/User/Login";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShowProduct />}></Route>
          <Route path="/Register" element={<Register />}></Route>
          <Route path="/Login" element={<Login />}></Route>

          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route
            path="/product/search/:term?"
            element={<SearchProduct />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
