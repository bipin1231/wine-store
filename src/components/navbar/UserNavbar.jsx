import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link,useNavigate } from 'react-router-dom';
import { Wine, Search, ShoppingCart, User } from 'lucide-react';
import { Button, ButtonGroup } from "@nextui-org/button"
import { Input } from "@nextui-org/input"
import { useSelector } from 'react-redux';
import { useGetProductsNameListByNameQuery } from '../../redux/productApi';
import { debounce } from 'lodash'; // Import lodash debounce

export default function UserNavbar() {
  const navigate = useNavigate();

  const [searchInput, setSearchInput] = useState(""); // What user types
  const [debouncedQuery, setDebouncedQuery] = useState(""); // What we search for
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [showList, setShowList] = useState(false);

  // Create debounced function using Lodash
  const debouncedSearch = useMemo(
    () => debounce((value) => {
      setDebouncedQuery(value);
      console.log("API call triggered for:", value);
    }, 2000), // 500ms delay
    []
  );

  // RTK Query - only runs when debouncedQuery changes
  const { data: results = [], isLoading } = useGetProductsNameListByNameQuery(debouncedQuery, {
    skip: !debouncedQuery.trim() // Only fetch when query is not empty
  });
console.log("api data",results);

  // Handle input change
  const handleSearch = useCallback((e) => {
    const value = e.target.value;
    setSearchInput(value);
    
    // Show/hide dropdown based on input
    setShowList(value.length > 0);
    
    // Debounce the actual search
    debouncedSearch(value);
  }, [debouncedSearch]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
         setIsSearchActive(!isSearchActive)
      setShowList(!showList)
     navigate(`/product-catalog/${searchInput}`);
  
      // Handle enter key logic here
    }
  }, [searchInput]);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchInput("");
    setDebouncedQuery("");
    setShowList(false);
    setIsSearchActive(false);
  }, []);

  // Toggle search visibility
  const toggleSearch = useCallback(() => {
    setIsSearchActive(prev => !prev);
    if (isSearchActive) {
      clearSearch();
    }
  }, [isSearchActive, clearSearch]);

  return (
    <header className="xl:px-8 bg-white bg-opacity-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-md supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Wine className="h-6 w-6" />
          <span className="text-xl font-bold">Elegant Wines</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <Link to={"/collection-page"} className="transition-colors hover:text-primary">
            Collections
          </Link>
          <Link to={"/product-catalog"} className="transition-colors hover:text-primary">
            Product
          </Link>
          <Link to="/about" className="transition-colors hover:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <motion.div
            className="relative"
            initial={false}
            animate={isSearchActive ? { width: '300px', opacity: 1 } : { width: '0px', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <Input
              classNames={{
                base: "max-w-full sm:max-w-[10rem] h-10",
                mainWrapper: "h-full",
                input: "text-small",
                inputWrapper: "pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] transition-all",
              }}
              placeholder="Type to search..."
              size="sm"
              value={searchInput}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              type="search"
            />
          </motion.div>

          <Button variant="ghost" size="icon" onClick={toggleSearch}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Link to={'/cart-page'} variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
          </Link>

          <Link to={'/login'} variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Link>
        </div>
      </div>

      {/* Search Results Dropdown */}
      {showList && searchInput && (
        <div className="absolute bg-white shadow-lg w-full p-4 z-50 border-t">
          {isLoading ? (
            <p className="text-gray-500">Searching...</p>
          ) : results.length > 0 ? (
            <ul className="space-y-2">
              {results.map((name,index) => (
                <li key={index} className="py-2 border-b last:border-b-0">
                  <Link 
                    to={`/product-catalog/${name}`}
                    onClick={clearSearch}
                    className="flex hover:underline items-center space-x-4 text-gray-800 hover:text-blue-600"
                  >
                    <div>
                      <div className="font-medium">{name}</div>
                
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : debouncedQuery ? (
            <p className="text-gray-500">No results found for "{searchInput}".</p>
          ) : null}
        </div>
      )}
    </header>
  );
}