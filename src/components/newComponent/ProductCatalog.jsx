"use client";
import React, { useState, useEffect } from "react";
import {
  useGetProductsQuery,
  useGetProductsBySizeAllQuery,
  useGetFilteredProductsQuery,
  useGetProductsByNameQuery,
} from "../../redux/productApi";
import { useGetCategoryQuery } from "../../redux/categoryApi";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useParams,useLocation } from "react-router-dom";
import { FaFilter, FaTimes, FaSearch, FaHeart, FaShoppingCart, FaStar, FaPlus, FaMinus } from "react-icons/fa";

// Enhanced Product Card Component
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <motion.div 
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Link
      to={`/product-page/${product.productId}`}
      state={{ productSizeId: product.productSizeId}}
      >
      {/* Image Container */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
        <img 
          src={`http://localhost:8080/images/${product.imageUrl}`}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover p-6 transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 left-4 bg-white p-2.5 rounded-full shadow-md transition-all duration-300 hover:scale-110"
          aria-label="Add to wishlist"
        >
          <FaHeart className={isLiked ? "text-red-500" : "text-gray-400"} />
        </button>

        {/* Add to Cart Button - Appears on hover */}
        <motion.button
          className={`absolute bottom-4 right-4 bg-[#2c2c2c] text-white rounded-full p-3 shadow-lg transform transition-all duration-300 ${
            isHovered 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-2 opacity-0'
          } hover:scale-105 hover:bg-[#3c3c3c]`}
          aria-label="Add to cart"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus size={16} />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Name & Price Row */}
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">{product.productName}</h3>
          <span className="text-lg font-bold text-[#8b5a2b]">
            Rs.{product.price.toFixed(2)}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < 4 ? "text-amber-400" : "text-gray-300"} 
              size={14} 
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">(42)</span>
        </div>

        {/* Size & Action */}
        <div className="flex justify-between items-center pt-2">
          <span className="text-sm text-gray-500 px-3 py-1.5 bg-gray-100 rounded-full font-medium">
            {product.size}
          </span>
          <button className="text-sm text-[#8b5a2b] font-medium hover:underline">
            View Details
          </button>
        </div>
      </div>
      </Link>
    </motion.div>
  );
};

// Reusable Select Component
const Select = ({ children, value, onValueChange }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8b5a2b] text-sm font-medium"
  >
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const ProductCatalog = () => {
  const { searchQuery } = useParams();
  const { searchQueryCategory } = useLocation();
  const queryCat = new URLSearchParams(searchQueryCategory);
  const categoryQuery = queryCat.get("category");


  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [activeFilters, setActiveFilters] = useState(0);


  
  const { data: categories = [] } = useGetCategoryQuery();
  const { data: productBySize = [], error, isLoading  } = useGetProductsBySizeAllQuery({
    skip: searchQuery,
  });

  console.log("lll products",productBySize);
  
  const { data: productBySizeBySearchQuery = [] } =
    useGetProductsByNameQuery(searchQuery, { skip: !searchQuery });

  const [queryFilters, setQueryFilters] = useState(null);

  const { data: filteredProductsQuery = null } = useGetFilteredProductsQuery(
    queryFilters,
    {
      skip: !queryFilters,
    }
  );

  // Update active filters count
  useEffect(() => {
    let count = 0;
    if (selectedSort) count++;
    if (selectedCategories.length > 0) count++;
    if (priceRange[1] < 1000) count++;
    
    setActiveFilters(count);
  }, [selectedSort, selectedCategories, priceRange]);

  const sortProducts = (order) => {
    setSelectedSort(order);
    setQueryFilters((prev) => ({
      ...prev,
      sort: order,
    }));
  };

  const handleCategorySelect = (categoryName) => {
    const updatedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter(cat => cat !== categoryName)
      : [...selectedCategories, categoryName];
    
    setSelectedCategories(updatedCategories);
    
    setQueryFilters((prev) => ({
      ...prev,
      categoryName: updatedCategories.length > 0 ? updatedCategories.join(',') : null
    }));
  };

  const resetFilters = () => {
    setQueryFilters(null);
    setSelectedSort('');
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
  };

  const getVisibleProducts = () => {
    if (searchQuery && productBySizeBySearchQuery?.length > 0) {
      return productBySizeBySearchQuery;
    } else if (filteredProductsQuery?.content?.length > 0) {
      return filteredProductsQuery.content;
    } else {
      return productBySize;
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-screen bg-[#f8f7f4]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#8b5a2b] mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading items</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-screen bg-[#f8f7f4]">
      <div className="text-center p-8 bg-white rounded-2xl shadow-sm max-w-md">
        <div className="text-red-500 text-5xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Something Went Wrong</h3>
        <p className="text-gray-600 mb-6">We're having trouble loading the products. Please try again later.</p>
        <Button 
          onClick={() => window.location.reload()}
          className="bg-[#2c2c2c] text-white px-6 py-3 rounded-full font-medium"
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  return (
    <div className="bg-[#f8f7f4] min-h-screen">
 

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between items-center mb-6 p-4 bg-white rounded-2xl shadow-sm">          
          <div className="flex items-center">
            <span className="text-sm text-gray-600 mr-2 font-medium">Sort:</span>
            <Select value={selectedSort} onValueChange={sortProducts}>
              <SelectItem value="">Recommended</SelectItem>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </Select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
         

          {/* Products Grid */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm">
              <p className="text-gray-600 font-medium">
                Showing {getVisibleProducts()?.length || 0} products
                {searchQuery && ` for "${searchQuery}"`}
                {activeFilters > 0 && ` (${activeFilters} filter${activeFilters > 1 ? 's' : ''} applied)`}
              </p>
              
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-sm text-gray-600 font-medium">Sort by:</span>
                <Select value={selectedSort} onValueChange={sortProducts}>
                  <SelectItem value="">Recommended</SelectItem>
                  <SelectItem value="asc">Price: Low to High</SelectItem>
                  <SelectItem value="desc">Price: High to Low</SelectItem>
                </Select>
                {activeFilters > 0 && (
                  <button 
                    onClick={resetFilters}
                    className="text-sm text-[#8b5a2b] hover:underline font-medium ml-4"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {getVisibleProducts()?.length > 0 ? (
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.1 }
                  }
                }}
              >
                {getVisibleProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
                <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">Try adjusting your search or filter criteria to find what you're looking for.</p>
                <Button 
                  onClick={resetFilters}
                  className="bg-[#2c2c2c] text-white px-6 py-3 rounded-full font-medium"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Load More Button */}
            {getVisibleProducts()?.length >= 12 && (
              <div className="mt-12 flex justify-center">
                <Button 
                  className="bg-[#2c2c2c] text-white px-8 py-3.5 rounded-full font-medium shadow-sm hover:opacity-90"
                >
                  Load More
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCatalog;