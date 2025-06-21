import React from "react";
import "./index.css";
import ShowProduct from "./Components/Product/ShowProduct.jsx";
import Home from "./Components/Home";

const App = () => {
  return (
    <div>
      <div>
        <ShowProduct></ShowProduct>
      </div>
      <div>
        <Home />
      </div>
    </div>
  );
};

export default App;
