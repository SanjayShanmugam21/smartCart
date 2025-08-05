import React, { useState } from 'react';
import product from '../product.json';

const Slidebar = ({
  brands,
  priceRange,
  setPriceRange,
  selectedBrands,
  setSelectedBrands,
  selectedRam,
  setSelectedRam,
  selectedStorage,
  setSelectedStorage,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const storage = [...new Set(product.map((p) => p.storage))].sort();
  const ram = [...new Set(product.map((p) => p.ram))].sort((a, b) => a - b);
  const minPrice = Math.min(...product.map((p) => p.price));
  const maxPrice = Math.max(...product.map((p) => p.price));

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="md:hidden bg-gray-100 p-2 shadow">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-emerald-600 text-white px-4 py-2 rounded"
        >
          {mobileOpen ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Sidebar for desktop & collapsible for mobile */}
      <div
        className={`bg-gray-200 p-4 h-auto md:h-screen sticky top-16 overflow-y-auto shadow-inner w-full md:w-64 transition-all duration-300 ease-in-out
        ${mobileOpen ? 'block' : 'hidden'} md:block`}
      >
        <h2 className="text-xl font-semibold text-emerald-800 mb-6">Filters</h2>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold text-emerald-800">Brands</h3>
          {brands.map((brand) => (
            <label key={brand} className="flex items-center mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() =>
                  setSelectedBrands(
                    selectedBrands.includes(brand)
                      ? selectedBrands.filter((b) => b !== brand)
                      : [...selectedBrands, brand]
                  )
                }
                className="mr-2 accent-emerald-500"
              />
              {brand}
            </label>
          ))}
        </div>

        {/* Price Range */}
        <div className="mb-6">
          <h3 className="font-semibold text-emerald-800">Price Range</h3>
          <input
            type="range"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            min={minPrice}
            max={maxPrice}
            className="w-full accent-emerald-500"
          />
          <div className="flex justify-between text-sm mt-2">
            <span>{priceRange[0]}</span>
            <span>{priceRange[1]}</span>
          </div>
        </div>

        {/* RAM Filter */}
        <div className="mb-4">
          <div className="mb-2 font-semibold text-emerald-800">RAM</div>
          <select
            value={selectedRam}
            onChange={(e) =>
              setSelectedRam(e.target.value ? parseInt(e.target.value) : null)
            }
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-200"
          >
            <option value="">All</option>
            {ram.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Storage Filter */}
        <div className="mb-4">
          <div className="mb-2 font-semibold text-emerald-800">Storage</div>
          <select
            value={selectedStorage}
            onChange={(e) =>
              setSelectedStorage(e.target.value ? parseInt(e.target.value) : null)
            }
            className="w-full border border-gray-300 rounded-md focus:outline-none focus:ring-emerald-200"
          >
            <option value="">All</option>
            {storage.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default Slidebar;
