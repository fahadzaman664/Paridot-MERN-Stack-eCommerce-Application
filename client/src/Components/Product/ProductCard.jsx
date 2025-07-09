import { useContext, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
const ProductCard = () => {
  const {
    filteredData,
    addToCart,
    setLastAddedProduct,
    setCart,
    setCartSheetOpen,
  } = useContext(AppContext);
  const [hovered, setHovered] = useState({});

  const handleHover = (id, isHovering) => {
    setHovered((prev) => {
      return { ...prev, [id]: isHovering };
    });
  };

  const onClickAddToCart = async (title, price, qty, productId, imgSrc) => {
    const response = await addToCart(title, price, qty, productId, imgSrc);
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
    <div className=" flex flex-wrap justify-center gap-x-5 gap-y-10 mt-20 mb-20 ">
      {(filteredData || []).map((product) => (
        <div
          className="bg-white h-full w-80 flex flex-col justify-center relative "
          key={product._id}
          onMouseEnter={() => handleHover(product._id, true)}
          onMouseLeave={() => handleHover(product._id, false)}
        >
          <Link
            to={`/product/${product._id}`}
            className="w-full h-96 object-cover overflow-hidden relative "
          >
            <img
              className=" w-full h-full object-cover hover:scale-105 transition delay-150 duration-700 ease-in-out "
              src={
                product.imgSrc === "empty"
                  ? "/mobileimagedefualt.jpeg"
                  : hovered[product._id]
                  ? "/mobileimagedefualt.jpeg"
                  : product.imgSrc
              }
              alt="Product Image"
              loading="lazy"
            />
          </Link>

          <div className=" mt-4 ">
            <div className="flex justify-between items-center ">
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                {product.title}
              </p>
            </div>
            <div>
              {hovered[product._id] && (
                <div className=" absolute bottom-5 right-5  ">
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

                    <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-100 group-hover:opacity-0   z-10">
                      Add to Cart
                    </span>
                  </button>
                </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-2">
              <b className="text-red-600 dark:text-green-400 font-semibold">
                Rs. {product.price.toLocaleString()}
              </b>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
