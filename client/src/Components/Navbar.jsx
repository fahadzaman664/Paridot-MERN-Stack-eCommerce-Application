import AppContext from "../Context/AppContext";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { ToastContainer, toast, Bounce } from "react-toastify";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import UserContext from "../Context/UserContext";

const Navbar = () => {
  const [search, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [suggestion, setsuggestion] = useState("");
  const { products, setFilteredData, cart } = useContext(AppContext);
  const { setIsAthenticated, setToken, isAuthenticated } =
    useContext(UserContext);
  const [open, setOpen] = useState(false);

  console.log("cart", cart)
  // submenu / filtering base on category
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
    navigate("/");
  };

  // for newin one week
  const filterByNewIn = () => {
    const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
    const now = new Date();

    const filtered = products.filter((product) => {
      const productDate = new Date(product.createdAt);
      return now - productDate <= SEVEN_DAYS_MS;
    });

    setFilteredData(filtered);
    navigate("/");
  };

  const noFilterShowAllProducts = () => {
    setFilteredData(products);
    navigate("/");
  };

  // Filter product titles matching input text
  const handlevalue = (e) => {
    const value = e.target.value;
    const filtered = products
      .filter((product) =>
        product.title.toLowerCase().includes(value.toLowerCase())
      )
      .slice(0, 3);
    setsuggestion(filtered);
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    setsuggestion([]);
    navigate(`/product/search/${title}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAthenticated(false);
    setOpen(false);
    navigate("/Login");
    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) {
      alert("please enter a search term");
      return;
    }
    navigate(`/product/search/${search}`);
    setSearchTerm("");
    setsuggestion([]);
  };

  // by price
  const handlePriceFilter = (value) => {
    if (value === "low") {
      const sorted = [...products].sort((a, b) => a.price - b.price);
      setFilteredData(sorted);
    } else if (value === "high") {
      const sorted = [...products].sort((a, b) => b.price - a.price);
      setFilteredData(sorted);
    }
    navigate("/");
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow flex flex-col">
      <div className="flex flex-col md:flex-row items-center justify-between  bg-white sm:px-6 lg:px-8 gap-4 py-2">
        {/* Logo Section */}
        <Link
          className="flex items-center  
        "
          to="/"
          onClick={() => noFilterShowAllProducts()}
        >
          <img
            src="/paridot3.png"
            alt="Paridot"
            className="w-40 h-22 rounded-full"
          />
        </Link>

        {/* Search Box */}
        <div className="flex-1 mx-8 max-w-lg relative">
          <form onSubmit={handleSubmit}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className=" flex w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              value={search}
              name="search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handlevalue(e);
              }}
              placeholder="Search products..."
              className=" pl-10 pr-4 w-full px-4 py-2 text-black rounded-md focus:outline-none  "
            />
          </form>
          {/* Suggestions Dropdown */}
          {suggestion.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-y-auto z-50">
              {suggestion.map((product, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                  onClick={() => handleSuggestionClick(product.title)}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {isAuthenticated && (
            <>
              <div className="relative">
                <button className="hover:bg-white hover:text-red-500 cursor-pointer text-black px-4 py-2 rounded-md transition">
                  Cart
                </button>
                {cart?.items && cart.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cart.items.length}
                  </span>
                )}
              </div>
              <Link to={"/profile"}>
                <button className="hover:bg-white cursor-pointer hover:text-red-500 text-black px-4 py-2 rounded-md transition">
                  Profile
                </button>
              </Link>
              <button
                className="  text-black cursor-pointer hover:text-red-500 px-4 py-2 rounded-md transition"
                onClick={() => setOpen(true)}
              >
                Logout
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link
                to={"/Login"}
                className="hover:bg-white cursor-pointer hover:text-red-500 text-black px-4 py-2 rounded-md transition"
              >
                Login
              </Link>
              <Link to="/Register">
                <button className="hover:bg-white cursor-pointer hover:text-red-500 text-black px-4 py-2 rounded-md cursor-pointer transition">
                  Register
                </button>
              </Link>
            </>
          )}

          <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
              transition
              className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                  transition
                  className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                        <ArrowRightOnRectangleIcon
                          aria-hidden="true"
                          className="size-6 text-blue-600"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <DialogTitle
                          as="h3"
                          className="text-base font-semibold text-gray-900"
                        >
                          Sign Out Confirmation
                        </DialogTitle>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to log out of your account?
                            You’ll need to sign in again to continue.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                    >
                      Sign Out
                    </button>
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => setOpen(false)}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </DialogPanel>
              </div>
            </div>
          </Dialog>
        </div>
      </div>
      <div>
        <div className=" bg-red-200 sticky top-16 z-40 w-full shadow-inner border-t border-gray-300">
          <div className=" max-w-7xl mx-auto flex flex-wrap justify-center gap-6 py-2">
            <button
              className="cursor-pointer text-black hover:text-red-500 font-medium transition"
              onClick={() => filterByNewIn()}
            >
              NewIn
            </button>
            <button
              className="cursor-pointer text-black hover:text-red-500 font-medium transition"
              onClick={() => filterByCategory("Mobile Phone")}
            >
              Mobile Phone
            </button>
            {/* ✅ Price Dropdown */}
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center items-center gap-x-1 rounded-md  px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50">
                  Price
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 size-5 text-gray-400"
                  />
                </Menu.Button>
              </div>

              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handlePriceFilter("low")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full px-4 py-2 text-left text-sm`}
                      >
                        Low to High
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => handlePriceFilter("high")}
                        className={`${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        } block w-full px-4 py-2 text-left text-sm`}
                      >
                        High to Low
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
            <button
              className=" cursor-pointer text-black hover:text-red-500 font-medium transition"
              onClick={() => filterByCategory("watches")}
            >
              Watches
            </button>
            <button
              className="cursor-pointer text-black hover:text-red-500 font-medium transition"
              onClick={() => filterByCategory("headPhones")}
            >
              Headphones
            </button>
            <button
              className=" cursor-pointer text-black hover:text-red-500 font-medium transition"
              onClick={() => filterByCategory("Earbuds")}
            >
              EarBuds
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
