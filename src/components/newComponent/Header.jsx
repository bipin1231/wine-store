"use client";
import React, { useState, useEffect,useCallback } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser, FaHeart, FaShoppingCart, FaStar, FaPlus } from "react-icons/fa";
import { Wine, Grape, Beer, Martini, ChevronDown, Star, ShoppingCart, Plus } from "lucide-react";
import { Link, NavLink, useLocation,useNavigate } from "react-router-dom";
import { useGetProductsBySizeAllQuery, useGetProductsNameListByNameQuery } from "../../redux/productApi";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { debounce } from "lodash";

const categories = [
  {
    title: "Wine",
    icon: Wine,
    items: [
      { name: "Red Wine", href: "/wine/red" },
      { name: "White Wine", href: "/wine/white" },
    ],
  },
  {
    title: "Spirits",
    icon: Martini,
    items: [
      { name: "Whiskey", href: "/spirits/whiskey" },
      { name: "Vodka", href: "/spirits/vodka" },
      { name: "Gin", href: "/spirits/gin" },
      { name: "Rum", href: "/spirits/rum" },
    ],
  },
  {
    title: "Beer",
    icon: Beer,
    items: [
      { name: "Craft Beer", href: "/beer/craft" },
      { name: "Light Beer", href: "/beer/import" },
      { name: "Strong", href: "/beer/domestic" },
      { name: "Super Strong", href: "/beer/light" },
    ],
  },
];

export default function HomePage() {
  const location = useLocation();


  const isCategoryActive = (category) => {
    const path = location.pathname.toLowerCase();

    // highlight if parent matches
    if (path.includes(category.title.toLowerCase())) return true;

    // highlight if any item inside matches
    if (category.items) {
      return category.items.some(item =>
        path.includes(item.name.toLowerCase())
      );
    }

    return false;
  };

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [inputValue, setInputValue] = useState(""); // instant UI updates
  const [searchQuery, setSearchQuery] = useState(""); // debounced API query
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([])
  const navigate=useNavigate();
  const handleSearch = (e) => {

if(inputValue && (e?.key=='Enter' || e=='Enter')){
navigate(`/product-catalog/${inputValue}`)
}

  }


  const debouncedSetSearchQuery = useCallback(
    debounce((val) => {
      // Don’t trigger API if user is deleting (val shorter than before)
      if (val.length >= searchQuery.length || !searchQuery.includes(val)) {
        setSearchQuery(val.toLowerCase());
      }
    }, 500),
    [searchQuery.length] // re-create only if input shrinks/length changes
  );

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetSearchQuery.cancel();
    };
  }, [debouncedSetSearchQuery]);

  console.log("input seacrhc quer",inputValue);
  
  console.log("API search query is ", searchQuery);

  const { data: productNameList = [] } = useGetProductsNameListByNameQuery(
    searchQuery,
    { skip: !searchQuery }
  );

const handleUserLogin=()=>{
  navigate('/login')
}

  const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";
  const accentText = "text-[#8b5a2b]";
  const highlight = "text-[#a63f3f]";
  const buttonStyle = "bg-[#2c2c2c] text-white rounded-full px-6 py-2 transition hover:opacity-90 shadow-md";
  const inputStyle = "bg-white border border-gray-200 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#8b5a2b]";
  return (
    <div className="bg-[#f8f7f4]font-sans text-[#2c2c2c]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-bold flex items-center">
            <Wine className="text-[#a63f3f] mr-2" />
            <span className="text-[#2c2c2c]">Vino</span>
            <span className="text-[#a63f3f]">Selecto</span>
          </div>

          <div className="flex-1 flex items-center gap-2 w-full md:w-auto max-w-2xl">
            <div className="relative w-full">
              <input
                placeholder="Search for wines, spirits, beer..."
                className={inputStyle}
                value={inputValue}
                onKeyDown={(e)=>handleSearch(e)}
                onChange={(e) => {
                  const val = e.target.value;
                  setInputValue(val); // update UI immediately
                  debouncedSetSearchQuery(val); // debounce API call
                }}
                 onFocus={() => setIsSearchActive(true)}
    onBlur={() => setTimeout(() => setIsSearchActive(false), 150)} // delay to allow click

              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <FaSearch onClick={() => handleSearch('Enter')} />
              </button>
              <AnimatePresence>
    {isSearchActive && productNameList.length > 0 && inputValue && (
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
      >
        {productNameList.map((name, index) => (
          <Link
          to={`product-catalog/${name}`}
          >
          <li
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-[#f1f1f1] transition"
            onMouseDown={() => { // use onMouseDown to avoid blur before click
              setInputValue(name);
              setSearchQuery(name);
              setIsSearchActive(false);
            }}
          >
            {name}
          </li>
          </Link>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm font-medium">
              <FaMapMarkerAlt className="text-[#8b5a2b]" />
              <span>Locations</span>
            </button>

            <button className="relative p-2">
              <FaHeart className="text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#a63f3f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button className="relative p-2">
              <FaUser
              onClick={()=>handleUserLogin()}
              className="text-gray-700" 
              />
            </button>

            <button className="relative p-2">
              <FaShoppingCart className="text-gray-700" />
              {cartItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#a63f3f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <Navbar
        categories={categories}
        isCategoryActive={isCategoryActive}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
      />


    </div>
  );
}