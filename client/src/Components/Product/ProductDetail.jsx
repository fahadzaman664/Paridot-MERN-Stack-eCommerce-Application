import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";
import RelatedProducts from "./RelatedProducts";
const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(AppContext);

  const url = "http://localhost:1000";
  const [product, setProduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setquantity] = useState(0);

  const incrementquanity = () => {
    setquantity((prev) => {
      return prev + 1;
    });
  };

  const decrementquantity = () => {
    setquantity((prev) => {
      if (prev > 0) {
        return prev - 1;
      }

      return 0;
    });
  };
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/api/product/get/${id}`, {
          withCredentials: true,
        });
        setProduct(api.data.product);
        console.log(api.data);
      } catch (error) {
        console.error("Failed to fetch product");
      }
    };
    fetchProduct();
  }, [id]);
  if (!product) {
    return <div className="p-6 text-center">Loading product...</div>;
  }
  return (
    <div className="block">
      <div className="flex justify-end gap-x-4 mt-10  ">
        <div className="w-96 h-96  ">
          <img
            className=" w-full h-full object-cover hover:scale-105 transition delay-150 duration-700 ease-in-out"
            src={product.imgSrc}
            alt={product.title}
          ></img>
        </div>

        <div className=" block  items-center mr-70 w-1/3">
          <div className="mt-10">
            <p className="text-lg font-bold text-gray-900">{product.title}</p>
            <b className="text-red-600 dark:text-green-400 font-semibold">
              Rs. {product.price}
            </b>
          </div>

          <div className="flex gap-x-10 item-center mt-4 ">
            <div className="flex gap-4 mt-2">
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-lg font-bold"
                onClick={decrementquantity}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-lg font-bold"
                onClick={incrementquanity}
              >
                +
              </button>
            </div>

            <div>
              <button className=" bg-black text-white w-30 h-[42px] rounded-full cursor-pointer overflow-hidden   ">
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-6" onClick={() => setIsOpen(!isOpen)}>
            <b className="text-lg font-bold text-gray-900">Product Detail</b>
            <span className="font-bold mx-2">{isOpen ? "-" : "+"}</span>
          </div>

          <div className="pr-10 ">
            {isOpen && (
              <div className="inline mr-10 ">
                {product.description || "No additional details available."}
              </div>
            )}
          </div>
        </div>
      </div>
        
        <RelatedProducts category={product.category} />

    </div>
  );
};

export default ProductDetail;
