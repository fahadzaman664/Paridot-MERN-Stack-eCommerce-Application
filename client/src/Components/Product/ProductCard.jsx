import { useContext, useState, useEffect, useCallback } from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../Spinner";

const ProductCard = () => {
  const { filteredData, addToCart, setLastAddedProduct, setCartSheetOpen } =
    useContext(AppContext);

  const [hovered, setHovered] = useState({});
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [noProductFound, setNoProductFound] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    // Reset hover state when products change
    setHovered({});
  }, [filteredData]);

  // Wait until filteredData is available to mark loading complete
  useEffect(() => {
    if (filteredData !== null && filteredData !== undefined) {
      setIsInitialLoad(false);
    }
  }, [filteredData]);

  useEffect(() => {
    // Only process if filteredData is actually loaded (not null/undefined)
    if (!isInitialLoad && Array.isArray(filteredData)) {
      if (filteredData.length > 0) {
        setVisibleProducts(filteredData.slice(0, itemsPerPage));
        setHasMore(filteredData.length > itemsPerPage);
        setNoProductFound(false);
      } else {
        // Products loaded but empty - this is different from loading
        setVisibleProducts([]);
        setHasMore(false);

        setNoProductFound(true);
      }
    }
  }, [filteredData, isInitialLoad]);

  const fetchMoreData = () => {
    const nextItems = filteredData.slice(
      visibleProducts.length,
      visibleProducts.length + itemsPerPage
    );

    setVisibleProducts((prev) => [...prev, ...nextItems]);

    if (visibleProducts.length + nextItems.length >= filteredData.length) {
      // setTimeout(() => {
      setShowEndMessage(true);
      // }, 1000);
      setHasMore(false);
    }
  };

  const handleHover = useCallback((id, isHovering) => {
    setHovered((prev) => ({
      ...prev,
      [id]: isHovering,
    }));
  }, []);

  const onClickAddToCart = async (title, price, qty, productId, imgSrc) => {
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

  // Show spinner only during initial load
  if (isInitialLoad || filteredData === null || filteredData === undefined) {
    return (
      <div className="p-6 flex justify-center">
        <Spinner />
      </div>
    );
  }

  // Show no products message if loaded but empty
  if (noProductFound) {
    return (
      <div className="p-6 flex justify-center">
        <p className="text-center mt-6 font-semibold text-gray-500">
          No products found
        </p>
      </div>
    );
  }

  return (
    <InfiniteScroll
      dataLength={visibleProducts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<Spinner />}
      endMessage={
        showEndMessage && (
          <p className="text-center mt-6 font-semibold text-gray-500">
            You've reached the end!
          </p>
        )
      }
    >
      <div className=" flex flex-wrap justify-center md:gap-x-8 sm:gap-x-4 gap-y-6  sm:px-4  mb-20">
        {visibleProducts.map((product) => (
          <div
            className={`${
              visibleProducts.length === 1
                ? "w-[300px] mx-auto"
                : "w-[48%] sm:w-[48%] md:w-[30%] lg:w-[23%]"
            } bg-white flex flex-col justify-center relative p-2 rounded-md shadow-sm`}
            key={product._id}
            onMouseEnter={() => handleHover(product._id, true)}
            onMouseLeave={() => handleHover(product._id, false)}
          >
            <Link
              to={`/product/${product._id}`}
              className="w-full h-60 md:h-96 object-cover overflow-hidden relative "
            >
              <img
                className=" w-full h-full object-cover hover:scale-105 transition delay-100 duration-500 ease-in-out "
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

            <div className=" mt-2 ">
              <div className="flex justify-between items-center ">
                <p className="text-md font-semibold text-gray-900  ">
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

                      <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 opacity-100 group-hover:opacity-0 z-10">
                        Add to Cart
                      </span>
                    </button>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center mt-2">
                <b className="text-red-600 font-semibold">
                  Rs. {Number(product.price).toLocaleString()}{" "}
                </b>
              </div>
            </div>
          </div>
        ))}
      </div>
    </InfiniteScroll>
  );
};

export default ProductCard;
