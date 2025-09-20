import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion,AnimatePresence } from 'framer-motion';
import { FaUser } from "react-icons/fa";
import { useSelector, shallowEqual } from 'react-redux';
import { useLogoutMutation } from '../../redux/authApi';
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/userSlice";



const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

export default function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
    const [showUserDropdown, setShowUserDropdown] = useState(false);

  const sidebarRef = useRef(null); // Reference for sidebar

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

const dispatch=useDispatch();

  const [logoutMutation] = useLogoutMutation();
  const userStoredData = useSelector(state => state.users.userInfo, shallowEqual)

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


  // Close sidebar when clicking outside of it
  useEffect(() => {


    function handleClickOutside(event) {

      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false); // Close sidebar if clicked outside
      }
    }

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside); // Add listener when sidebar is open
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Clean up event listener
    };
  }, [isSidebarOpen]);

  const navItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/product-lists', label: 'Products' },
    { path: '/category', label: 'Category' },
    { path: '/manage-products', label: 'Manage Products' },
    { path: '/add-products', label: 'Add Product' },
    { path: '/manage-sizes', label: 'Manage Sizes' },
    { path: '/customers', label: 'Customers' },
    { path: '/settings', label: 'Settings' },
  ];

  return (
    <>
      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef} // Attach ref to the sidebar
        className="bg-indigo-700 text-white w-64 min-h-screen p-4 fixed left-0 top-0 bottom-0 z-50"
        variants={sidebarVariants}
        initial="closed"
        animate={isSidebarOpen ? 'open' : 'closed'}
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Wine Admin</h1>
          <button onClick={toggleSidebar} className="text-white hover:bg-indigo-600 p-2 rounded">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={toggleSidebar}
                  className={`block px-4 py-2 rounded transition-colors duration-200 ${location.pathname === item.path ? 'bg-indigo-800' : 'hover:bg-indigo-600'
                    }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </motion.aside>

      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Sidebar Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="text-indigo-700 hover:bg-gray-100 p-2 rounded-lg focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>

          {/* Search Bar */}
          <input
            type="search"
            placeholder="Search..."
            className="w-64 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        {/* Admin Section */}
        <div className="flex items-center space-x-4">
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
        </div>
      </header>
    </>
  );
}