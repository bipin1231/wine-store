"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { FaSearch, FaMapMarkerAlt, FaUser, FaHeart, FaShoppingCart, FaStar, FaPlus, FaArrowLeft } from "react-icons/fa";
import { Wine, Beer, Martini } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useGetProductsNameListByNameQuery } from "../../redux/productApi";
import { motion, AnimatePresence } from "framer-motion";
import { debounce } from "lodash";
import { useSelector, shallowEqual } from 'react-redux';
import { useLogoutMutation } from "../../redux/authApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";

export default function HomePage() {
  const location = useLocation();
  const userStoredData = useSelector(state => state.users.userInfo, shallowEqual)
  const [mobileSearchActive, setMobileSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  const [cartItems, setCartItems] = useState(0);
  const [wishlist, setWishlist] = useState([]);
  const [inputValue, setInputValue] = useState(""); // instant UI updates
  const [searchQuery, setSearchQuery] = useState(""); // debounced API query
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showUserDropdown, setShowUserDropdown] = useState(false); // New state for user dropdown
  const navigate = useNavigate();
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useDispatch();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside the user dropdown
      if (showUserDropdown && !event.target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // Focus search input when mobile search is activated
  useEffect(() => {
    if (mobileSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [mobileSearchActive]);

  const handleSearch = (e) => {
    if (inputValue && (e?.key == 'Enter' || e == 'Enter')) {
      navigate(`/product-catalog/${inputValue}`);
      setMobileSearchActive(false);
    }
  }

  const debouncedSetSearchQuery = useCallback(
    debounce((val) => {
      // Don't trigger API if user is deleting (val shorter than before)
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

  const { data: productNameList = [] } = useGetProductsNameListByNameQuery(
    searchQuery,
    { skip: !searchQuery }
  );

  const handleUserLogin = () => {
    navigate('/auth')
  }

  const handleLogout = async () => {
    // Add your logout logic here
    try {
      await logoutMutation();
      dispatch(setUserInfo(null))
      console.log("Logging out...");
    } catch (error) {
      console.log("failed to logout", error);
    }

    // For example: dispatch logout action
    setShowUserDropdown(false);
  }

  const handleProfile = () => {
    // Add your profile navigation logic here
    console.log("Going to profile...");
    navigate('/profile');
    setShowUserDropdown(false);
  }

  const baseBg = "bg-[#f8f7f4]";
  const baseText = "text-[#2c2c2c]";
  const accentText = "text-[#8b5a2b]";
  const highlight = "text-[#a63f3f]";
  const buttonStyle = "bg-[#2c2c2c] text-white rounded-full px-6 py-2 transition hover:opacity-90 shadow-md";
  const inputStyle = "bg-white border border-gray-200 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#8b5a2b]";

  return (
    <div className="bg-[#f8f7f4] font-sans text-[#2c2c2c]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 py-4 px-6 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo - Hidden on mobile when search is active */}
          <Link to={"/"} className={mobileSearchActive ? "hidden md:block" : "block"}>
            <div className="text-2xl font-bold flex items-center">
              <Wine className="text-[#a63f3f] mr-2" />
              <span className="text-[#2c2c2c]">Vino</span>
              <span className="text-[#a63f3f]">Selecto</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="flex-1 hidden md:flex items-center gap-2 max-w-2xl">
            <div className="relative w-full">
              <input
                placeholder="Search for wines, spirits, beer..."
                className={inputStyle}
                value={inputValue}
                onKeyDown={(e) => handleSearch(e)}
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
                        key={index}
                      >
                        <li
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

          {/* Mobile Search - YouTube style */}
          <div className={`md:hidden fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${mobileSearchActive ? 'translate-y-0' : '-translate-y-full'}`}>
            <div className="flex items-center p-4 border-b border-gray-200">
              <button 
                onClick={() => setMobileSearchActive(false)}
                className="p-2 mr-3 text-gray-700"
              >
                <FaArrowLeft />
              </button>
              <div className="relative flex-1">
                <input
                  ref={searchInputRef}
                  placeholder="Search for wines, spirits, beer..."
                  className="bg-gray-100 border-0 rounded-full px-4 py-3 w-full focus:outline-none focus:ring-1 focus:ring-[#8b5a2b]"
                  value={inputValue}
                  onKeyDown={(e) => handleSearch(e)}
                  onChange={(e) => {
                    const val = e.target.value;
                    setInputValue(val);
                    debouncedSetSearchQuery(val);
                  }}
                  onFocus={() => setIsSearchActive(true)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <FaSearch onClick={() => handleSearch('Enter')} />
                </button>
              </div>
            </div>
            
            {/* Search suggestions */}
            <AnimatePresence>
              {inputValue && productNameList.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-white py-2 max-h-96 overflow-y-auto"
                >
                  {productNameList.map((name, index) => (
                    <Link
                      to={`product-catalog/${name}`}
                      key={index}
                      onClick={() => setMobileSearchActive(false)}
                    >
                      <li className="px-6 py-3 flex items-center hover:bg-gray-100 transition">
                        <FaSearch className="text-gray-400 mr-3" />
                        <span>{name}</span>
                      </li>
                    </Link>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Right side icons */}
          <div className={`flex items-center gap-4 ${mobileSearchActive ? 'md:flex hidden' : 'flex'}`}>
            {/* Mobile search toggle button */}
            <button 
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMobileSearchActive(true)}
            >
              <FaSearch />
            </button>

            <button className="relative p-2">
              <FaHeart className="text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute top-0 right-0 bg-[#a63f3f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Updated User Button Section */}
            <div className="relative user-dropdown-container">
              {userStoredData ? (
                // Show dropdown when user is logged in
                <>
                  <button 
                    className="relative p-2"
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                  >
                    <FaUser className="text-gray-700" />
                  </button>
                  
                  <AnimatePresence>
                    {showUserDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                      >
                        <button
                          onClick={handleProfile}
                          className="w-full text-left px-4 py-2 hover:bg-[#f1f1f1] transition text-sm border-b border-gray-100"
                        >
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 hover:bg-[#f1f1f1] transition text-sm text-red-600"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                // Navigate to auth when user is not logged in
                <button 
                  className="relative p-2"
                  onClick={() => handleUserLogin()}
                >
                  <FaUser className="text-gray-700" />
                </button>
              )}
            </div>

            <Link to={'/cart-page'}>
              <button className="relative p-2">
                <FaShoppingCart className="text-gray-700" />
                {cartItems > 0 && (
                  <span className="absolute top-0 right-0 bg-[#a63f3f] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItems}
                  </span>
                )}
              </button>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}