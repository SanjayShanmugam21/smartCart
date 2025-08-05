import React from "react";
import img from "../assets/images/smart.png";

const Navbar = ({ searchQuery, setSearchQuery, cartItems, setCartSidebarOpen }) => {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-gray-800 p-3 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
        {/* Logo & Title */}
        <div className="flex items-center gap-2">
          <img src={img} alt="logo" className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
          <div className="text-white text-xl sm:text-2xl font-normal">SmartCart</div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-1/2 p-2 sm:p-3 text-sm sm:text-base rounded-md bg-white focus:outline-none"
          placeholder="🔍 Search for smartphones, brands, colors..."
        />

        {/* Cart Button */}
        <button
          onClick={() => {
            setCartSidebarOpen((prev) => !prev);
          }}
          className="relative text-white text-2xl mt-2 sm:mt-0"
        >
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 left-4 bg-red-500 px-2 py-1 rounded-full text-xs sm:text-sm">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
