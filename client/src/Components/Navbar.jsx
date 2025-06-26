import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [search, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product/search/${search}`);
    setSearchTerm("");
  };

  return (
    <div className="flex items-center justify-between sticky top-0 z-50   bg-white text-white  sm:px-6 lg:px-8 ">
      {/* Logo Section */}
      <Link className="flex items-center " to="/">
        <img
          src="paridot3.png"
          alt="Paridot"
          className="w-40 h-30 rounded-full"
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
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className=" pl-10 pr-4 w-full px-4 py-2 text-black rounded-md focus:outline-none  "
          />
        </form>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-4">
        <button className="hover:bg-white hover:text-red-500 cursor-pointer text-black px-4 py-2 rounded-md transition">
          Cart
        </button>
        <button className="hover:bg-white cursor-pointer hover:text-red-500 text-black px-4 py-2 rounded-md transition">
          Profile
        </button>
        <button className="hover:bg-white cursor-pointer hover:text-red-500 text-black px-4 py-2 rounded-md transition">
          Login
        </button>
        <button className="hover:bg-white cursor-pointer hover:text-red-500 text-black px-4 py-2 rounded-md cursor-pointer transition">
          Register
        </button>
        <button className="  text-black cursor-pointer hover:text-red-500 px-4 py-2 rounded-md transition">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
