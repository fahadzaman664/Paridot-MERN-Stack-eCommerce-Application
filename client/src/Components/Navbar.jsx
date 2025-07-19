import AppContext from "../Context/AppContext";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { toast, Bounce } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import {
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/Components/ui/drawer";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import UserContext from "../Context/UserContext";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [search, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const [suggestion, setsuggestion] = useState("");
  const {
    products,
    setFilteredData,
    cart,
    latestCart,
    cartSheetOpen,
    setCartSheetOpen,
    lastAddedProduct,
  } = useContext(AppContext);
  const { setIsAthenticated, setToken, isAuthenticated } =
    useContext(UserContext);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // submenu / filtering base on category
  const filterByCategory = (cat) => {
    setFilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
    navigate("/");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // for newin one week
  const filterByNewIn = () => {
    const SEVEN_DAYS_MS = 365 * 24 * 60 * 60 * 1000; // 365 days
    const now = new Date();

    const filtered = products.filter((product) => {
      const productDate = new Date(product.createdAt);
      return now - productDate <= SEVEN_DAYS_MS;
    });

    setFilteredData(filtered);
    navigate("/");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const noFilterShowAllProducts = () => {
    setFilteredData(products);
    navigate("/");
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    setsuggestion("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
    navigate(`/product/search/${title}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setIsAthenticated(false);
    setOpen(false);
    setMobileMenuOpen(false);
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
    setsuggestion("");
    setSearchOpen(false);
    setMobileMenuOpen(false);
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
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-3 lg:px-8">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <Bars3Icon className="h-6 w-6 text-gray-700" />
        </button>

        {/* Logo */}
        <Link to="/" onClick={() => noFilterShowAllProducts()}>
          <img
            src="/paridot3.png"
            alt="Paridot"
            className="h-12 w-auto sm:h-16 lg:h-20 rounded-full"
          />
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-8 relative">
          <form onSubmit={handleSubmit} className="w-full">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  handlevalue(e);
                }}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          </form>
         {/* <Link to="/smartsearch">SmartSearch</Link> */}

          {/* Desktop Suggestions */}
          {suggestion.length > 0 && (
            <ul className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-1 max-h-48 overflow-y-auto z-50">
              {suggestion.map((product, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-gray-700 border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(product.title)}
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile Search Button */}
          <button
            onClick={() => setSearchOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
          </button>

          {/* Cart Button */}
          {isAuthenticated && (
            <Link
              to="/cart"
              className="relative p-2 rounded-md hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faCartShopping}
                className="h-5 w-5 text-gray-700"
              />
              {cart?.items && cart.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.items.length}
                </span>
              )}
            </Link>
          )}

          {/* Desktop Auth Buttons */}
          {isAuthenticated ? (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/profile"
                className="text-gray-700 hover:text-red-500 font-medium transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/Login"
                className="text-gray-700 hover:text-red-500 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                to="/Register"
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Profile/Auth Button */}
          <div className="lg:hidden">
            {isAuthenticated ? (
              <Link to="/profile" className="p-2 rounded-md hover:bg-gray-100">
                <UserIcon className="h-6 w-6 text-gray-700" />
              </Link>
            ) : (
              <Link to="/Login" className="p-2 rounded-md hover:bg-gray-100">
                <UserIcon className="h-6 w-6 text-gray-700" />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation Menu */}
      {location.pathname !== "/checkout/address" &&
        location.pathname !== "/CheckOut" && location.pathname!== "/smartsearch" && (
          <div className="hidden lg:block border-t border-gray-200">
            <div className="flex justify-center items-center md:space-x-8 md:py-3">
              <button
                onClick={() => filterByNewIn()}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase"
              >
                New In
              </button>

              <button
                onClick={() => filterByCategory("Women Clothes")}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase"
              >
                Women
              </button>

              <button
                onClick={() => filterByCategory("Man Clothes")}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase"
              >
                Men
              </button>

              <div className="relative group">
                <button className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase">
                  Perfumes
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => filterByCategory("perfume-men")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Men's Perfumes
                  </button>
                  <button
                    onClick={() => filterByCategory("perfume-women")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Women's Perfumes
                  </button>
                </div>
              </div>

              <div className="relative group">
                <button className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase">
                  Price
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => handlePriceFilter("low")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Low to High
                  </button>
                  <button
                    onClick={() => handlePriceFilter("high")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    High to Low
                  </button>
                </div>
              </div>

              <button
                onClick={() => filterByCategory("watches")}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase"
              >
                Watches
              </button>

              <div className="relative group">
                <button className="text-gray-700 hover:text-red-500 font-medium transition-colors uppercase">
                  Kids
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => filterByCategory("Kid-Boys")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Boys
                  </button>
                  <button
                    onClick={() => filterByCategory("Kid-Girls")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700"
                  >
                    Girls
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Mobile Search Overlay */}
      {searchOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Search Products</h2>
            <button
              onClick={() => setSearchOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4">
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    handlevalue(e);
                  }}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  autoFocus
                />
              </div>
            </form>

            {/* Mobile Suggestions */}
            {suggestion.length > 0 && (
              <ul className="mt-4 space-y-2">
                {suggestion.map((product, index) => (
                  <li
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(product.title)}
                  >
                    {product.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-white z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-md"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="p-4 ">
            <button
              onClick={() => filterByNewIn()}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg font-medium"
            >
              New In
            </button>

            <button
              onClick={() => filterByCategory("Women Clothes")}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg font-medium"
            >
              Women
            </button>

            <button
              onClick={() => filterByCategory("Man Clothes")}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg font-medium"
            >
              Men
            </button>

            {/* Mobile Perfumes Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("perfumes")}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
              >
                Perfumes
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    activeDropdown === "perfumes" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "perfumes" && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => filterByCategory("perfume-men")}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-600"
                  >
                    Men's Perfumes
                  </button>
                  <button
                    onClick={() => filterByCategory("perfume-women")}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-600"
                  >
                    Women's Perfumes
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Price Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("price")}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
              >
                Price
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    activeDropdown === "price" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "price" && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => handlePriceFilter("low")}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-600"
                  >
                    Low to High
                  </button>
                  <button
                    onClick={() => handlePriceFilter("high")}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-600"
                  >
                    High to Low
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => filterByCategory("watches")}
              className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg font-medium"
            >
              Watches
            </button>

            {/* Mobile Kids Dropdown */}
            <div>
              <button
                onClick={() => toggleDropdown("kids")}
                className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg font-medium"
              >
                Kids
                <ChevronDownIcon
                  className={`h-5 w-5 transition-transform ${
                    activeDropdown === "kids" ? "rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "kids" && (
                <div className="ml-4 mt-2 space-y-2">
                  <button
                    onClick={() => filterByCategory("Kid-Boys")}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-600"
                  >
                    Boys
                  </button>
                  <button
                    onClick={() => filterByCategory("Kid-Girls")}
                    className="block w-full text-left p-2 hover:bg-gray-50 rounded-lg text-gray-600"
                  >
                    Girls
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Auth Section */}
            <div className="border-t pt-4 mt-6">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg font-medium"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => setOpen(true)}
                    className="block w-full text-left p-3 hover:bg-gray-50 rounded-lg font-medium text-red-500"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/Login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center p-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/Register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center p-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Logout Confirmation Dialog */}
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <ArrowRightOnRectangleIcon className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold">
                  Sign Out Confirmation
                </DialogTitle>
                <p className="text-sm text-gray-600">
                  Are you sure you want to log out?
                </p>
              </div>
            </div>
            <div className="flex space-x-3 justify-end">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Sign Out
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Cart Drawer */}
      <Drawer open={cartSheetOpen} onOpenChange={setCartSheetOpen}>
        <DrawerContent className="bg-white border-l max-w-[400px] w-full p-4 shadow-xl">
          <DrawerHeader>
            <DrawerTitle>Item Added to Cart</DrawerTitle>
            <DrawerDescription>
              Review your latest added item below:
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex items-center space-x-4 py-4">
            {lastAddedProduct ? (
              <div className="flex items-center space-x-4">
                <img
                  src={
                    lastAddedProduct.imgSrc || "https://via.placeholder.com/60"
                  }
                  alt={lastAddedProduct.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{lastAddedProduct.title}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {lastAddedProduct.qty}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: Rs. {lastAddedProduct.price}
                  </p>
                </div>
              </div>
            ) : (
              <p>No recent product added.</p>
            )}
          </div>

          <DrawerFooter className="flex justify-end gap-2">
            <DrawerClose asChild>
              <button className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100">
                Continue Shopping
              </button>
            </DrawerClose>
            <button
              onClick={() => {
                setCartSheetOpen(false);
                navigate("/cart");
              }}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Go to Cart
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
export default Navbar;
