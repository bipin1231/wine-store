import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';


const sidebarVariants = {
  open: { x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  closed: { x: '-100%', transition: { type: 'spring', stiffness: 300, damping: 30 } },
};

export default function AdminNavbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const sidebarRef = useRef(null); // Reference for sidebar

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    console.log(sidebarRef);
    
    function handleClickOutside(event) {
      console.log(event.target);
      
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
                  className={`block px-4 py-2 rounded transition-colors duration-200 ${
                    location.pathname === item.path ? 'bg-indigo-800' : 'hover:bg-indigo-600'
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
          <span className="text-gray-700">Admin User</span>
          <img
            src="/placeholder.svg?height=32&width=32"
            alt="Admin"
            className="w-8 h-8 rounded-full border-2 border-indigo-500"
          />
        </div>
      </header>
    </>
  );
}
