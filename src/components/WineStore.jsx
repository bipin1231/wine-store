// WineStore.jsx

import React from 'react';

const WineStore = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-md">
        <div className="text-2xl font-bold text-gray-800">WineStore</div>
        <div className="flex space-x-6">
          <a href="#collections" className="text-gray-700 hover:text-gray-900">Collections</a>
          <a href="#about" className="text-gray-700 hover:text-gray-900">About</a>
          <a href="#contact" className="text-gray-700 hover:text-gray-900">Contact</a>
          <button className="px-4 py-2 bg-red-600 text-white rounded-full">Shop Now</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative">
        <img
          src="https://via.placeholder.com/1920x600"
          alt="Premium Wine Collection"
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold text-white">Discover Premium Wines</h1>
          <p className="text-white mt-4">Curated selections just for you</p>
          <button className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full">Explore Collection</button>
        </div>
      </section>

      {/* Featured Collections */}
      <section id="collections" className="py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">Featured Collections</h2>
          <p className="mt-4 text-gray-600">Specially curated wines to suit every occasion</p>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Collection Cards */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x400"
              alt="Collection 1"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Luxury Reds</h3>
              <p className="mt-2 text-gray-600">Experience the finest red wines from around the world.</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x400"
              alt="Collection 2"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Classic Whites</h3>
              <p className="mt-2 text-gray-600">Elegant and timeless white wines for any occasion.</p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/400x400"
              alt="Collection 3"
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800">Sparkling Wines</h3>
              <p className="mt-2 text-gray-600">Celebrate with our best sparkling wines.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2024 WineStore. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default WineStore;
