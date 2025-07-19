import AppContext from "../../Context/AppContext";
import { useContext, useState , useCallback} from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import { ToastContainer, toast, Bounce } from "react-toastify";

const SearchProduct = () => {
  const { products, addToCart, setCartSheetOpen, setLastAddedProduct } =
    useContext(AppContext);
  const [hovered, setHovered] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [searchProduct, setSearchProduct] = useState([]);

  const navigate = useNavigate();

  const { term } = useParams();

  const handleHover = useCallback((id, isHovering) => {
    setHovered((prev) => ({ ...prev, [id]: isHovering }));
  }, []);

  useEffect(() => {
    // Reset hover state when search results change
    setHovered({});
  }, [searchProduct]);

  useEffect(() => {
    if (!term) {
      // Redirect or show a message if there's no search term
      navigate("/"); // Or any page you want
      return;
    }
   // Only show loading if products aren't loaded yet
  if (!products) {
    setIsLoading(true);
    return;
  }
    if (products && term) {
      const filtered = products.filter((data) => {
        const productTitle = data.title.toLowerCase();
        const searchTerm = term.trim().toLowerCase();
        return productTitle.includes(searchTerm);
      });
      setSearchProduct(filtered);
    }
    setIsLoading(false);
  }, [term, products, navigate]);

  // for highliting text in product card while searching

  const highlightMatch = useCallback((text, search) => {
    if (!search) return text;
    const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedSearch})`, "gi");
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      )
    );
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

  // Show spinner while loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!isLoading && searchProduct.length === 0) {
    return (
      <div className="p-6 text-center text-lg font-semibold">
        No matching product found...
      </div>
    );
  }
  return (
    <div>
      <div className="mt-8 my-8 flex flex-wrap justify-center ">
        <div className="block">
          <div className="p-2 mt-10 w-fit mx-auto flex justify-center rounded-md">
            <h1 className=" text-red font-bold underline decoration-pink-500/30 text-2xl  ">
              matched products
            </h1>
          </div>

          <div className="flex flex-wrap justify-center md:gap-x-3 sm:gap-x-4 gap-y-6 px-2 sm:px-4  mb-20">
            {(searchProduct || []).map((product) => (
              <div
                className={`${
                  searchProduct.length === 1
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
                    className="w-full h-full object-cover hover:scale-105 transition delay-100 duration-500 ease-in-out "
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

                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <p className="text-md font-semibold text-gray-900 ">
                      {highlightMatch(product.title, term)}
                    </p>
                  </div>

                  <div>
                    {hovered[product._id] && (
                      <div className=" absolute md:left-35  sm:left-45   ">
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
                    <b className="text-red-600   font-semibold">
                      Rs. {product.price.toLocaleString()}
                    </b>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
