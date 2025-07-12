import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import { toast, Bounce } from "react-toastify";
import Spinner from "../Spinner";
import axios from "axios";
import RelatedProducts from "./RelatedProducts";
import ProductImageZoom from "./ProductImageZoom";
const ProductDetail = () => {
  const { id } = useParams();
  const {
    addToCart,
    setLastAddedProduct,

    setCartSheetOpen,
  } = useContext(AppContext);

  const url = "http://localhost:1000";
  const [product, setProduct] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setquantity] = useState(1);

  const incrementquanity = () => {
    setquantity((prev) => {
      return prev + 1;
    });
  };

  const decrementquantity = () => {
    setquantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/api/product/get/${id}`, {
          withCredentials: true,
        });
        setProduct(api.data.product);
      } catch (error) {
        console.error("Failed to fetch product");
      }
    };
    setquantity(1);
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-6 flex justify-center">
        <Spinner />{" "}
      </div>
    );
  }

  const onClickAddToCart = async (title, price, qty, productId, imgSrc) => {
    const response = await addToCart(title, price, qty, productId, imgSrc);
    if (!response.success) {
      toast.error(response.message);
    }

    if (response.success) {
      const updatedCart = response.data;

      // Find the recently added/updated product by ID:
      const lastItem = updatedCart.items.find(
        (item) => item.productId === productId
      );

      // Update Navbar's state via prop:
      setLastAddedProduct(lastItem);
      toast.success(response.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      setCartSheetOpen(true);
    }
  };

  return (
    <div className="block ">
      <div className="flex flex-row flex-wrap justify-center items-center sm:items-start sm:gap-x-8 gap-y-8 mt-10 px-4  ">
        <div className="h-full ">
          <ProductImageZoom src={product.imgSrc} />
        </div>

        <div className=" w-96 pl-5 ">
          <div className="relative z-10 w-96 mt-6 ">
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
                className="w-8 h-8 flex items-center justify-center rounded -full bg-black text-white text-lg font-bold"
                onClick={incrementquanity}
              >
                +
              </button>
            </div>

            <div>
              <button
                className=" bg-black text-white w-30 h-[42px] rounded-full cursor-pointer overflow-hidden  
              "
                onClick={() =>
                  onClickAddToCart(
                    product.title,
                    product.price,
                    quantity,
                    product._id,
                    product.imgSrc
                  )
                }
              >
                Add to Cart
              </button>
            </div>
          </div>

          <div className="mt-6" onClick={() => setIsOpen(!isOpen)}>
            <b className="text-lg font-bold text-gray-900">Product Detail</b>
            <span className="font-bold mx-2">{isOpen ? "-" : "+"}</span>
          </div>

          <div className=" max-w-90">
            {isOpen && (
              <div className="inline  ">
                {product.description || "No additional details available."}
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        currentProductId={product._id}
      />
    </div>
  );
};

export default ProductDetail;
