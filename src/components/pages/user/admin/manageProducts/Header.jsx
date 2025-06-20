import React from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';

const Header = ({ searchQuery, setSearchQuery }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-light text-gray-800">Product Inventory</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your product catalog efficiently</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition">
            <FiPlus size={18} /> Add Product
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;