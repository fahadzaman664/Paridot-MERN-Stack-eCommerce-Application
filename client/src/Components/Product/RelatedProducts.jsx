import AppContext from "../../Context/AppContext";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Spinner from "../Spinner";

const RelatedProducts = ({ category, currentProductId }) => {
  const { products, addToCart, setCartSheetOpen, setLastAddedProduct } =
    useContext(AppContext);
  const [hovered, setHovered] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  const handleHover = (id, isHovering) => {
    setHovered((prev) => {
      return { ...prev, [id]: isHovering };
    });
  };

  useEffect(() => {
    if (products && category) {
      const filtered = products.filter(
        (data) =>
          data.category &&
          data.category.toLowerCase() === category.toLowerCase() &&
          data._id !== currentProductId
      );
      setRelatedProducts(filtered);
    }
  }, [category, products, currentProductId]);

  const onClickAddToCart = async (title, price, qty, productId, imgSrc) => {
    const response = await addToCart(title, price, qty, productId, imgSrc);
     const savedToken = localStorage.getItem("token");
    if (!savedToken) {
      return toast.error("You must be logged in to add to cart.", {
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
    }
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

  if (!relatedProducts) {
    return <Spinner />;
  }
  return (
    <div>
      <div className="mt-8 my-8 flex  flex-wrap justify-center  ">
        <div className="block">
          <div className="p-2 mt-10 w-fit mx-auto flex justify-center rounded-md">
            <h1 className=" text-red font-bold underline decoration-pink-500/30 text-2xl  ">
              RELATED PRODUCTS
            </h1>
          </div>

          <div className="overflow-x-auto w-full">
            <div className=" flex flex-wrap justify-center md:gap-x-3 sm:gap-x-4 gap-y-6 px-2 sm:px-4  mb-20">
              {relatedProducts.length > 0 ? (
                (relatedProducts || []).map((product) => (
                  <div
                    className={`${
                      relatedProducts.length === 1
                        ? "w-[300px] mx-auto"
                        : "w-[48%] sm:w-[48%] md:w-[30%] lg:w-[23%]"
                    } bg-white flex flex-col justify-center relative p-2 rounded-md shadow-sm`}
                    key={product._id}
                    onMouseEnter={() => handleHover(product._id, true)}
                    onMouseLeave={() => handleHover(product._id, false)}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full h-60 md:h-96  object-cover overflow-hidden relative "
                    >
                      <img
                        className=" w-full h-full object-cover hover:scale-105 transition delay-150 duration-700 ease-in-out "
                        src={
                          product.imgSrc === "empty"
                            ? ""
                            : hovered[product._id]
                            ? product.imgHover
                            : product.imgSrc
                        }
                        alt="Product Image"
                        loading="lazy"
                      />
                    </Link>

                    <div className=" mt-4 ">
                      <div className="flex justify-between items-center ">
                        <p className="text-md font-semibold text-gray-900">
                          {product.title}
                        </p>
                      </div>
                      <div>
                        {hovered[product._id] && (
                          <div className=" absolute md:left-35  sm:left-45  ">
                            <button
                              className="relative bg-black text-white w-30 h-[42px] rounded-md cursor-pointer overflow-hidden group "
                              onClick={() =>
                                onClickAddToCart(
                                  product.title,
                                  product.price,
                                  1,
                                  product._id,
                                  product.imgSrc
                                )
                              }
                            >
                              <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-0 group-hover:opacity-100 z-20">
                                🛒
                              </span>

                              <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-100 group-hover:opacity-0 text-lg    z-10">
                                Add to Cart
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <b className="text-red-600 font-semibold">
                          Rs. {product.price.toLocaleString()}
                        </b>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 font-semibold text-lg">
                  No related products found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
