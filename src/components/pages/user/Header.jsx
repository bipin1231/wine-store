import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wine, Search, ShoppingCart, User } from 'lucide-react';
import {Button, ButtonGroup} from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { useSelector } from 'react-redux';

export default function Header() {
  const [searchQuery,setSearchQuery]=useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredProducts,setFilteredProducts]=useState([])
  const [showList,setshowList]=useState(false)
  const productData=useSelector(state=>state.products.items)
    const handleSearch=(e)=>{
    setSearchQuery(e.target.value)
    console.log(searchQuery)
    
  }
  useEffect(()=>{

if(searchQuery){
const filteredProduct=productData.filter(p=>
  p.name.toLowerCase().includes(searchQuery) ||
  p.description.toLowerCase().includes(searchQuery) ||
  p.type.toLowerCase().includes(searchQuery)
)
if(filteredProduct) {setFilteredProducts(filteredProduct)

console.log(filteredProduct);
}
}
  },[searchQuery])

  return (
    <header className="xl:px-8 bg-white bg-opacity-10 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md shadow-md supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center  justify-between">
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
          <motion.form
            className="relative"
            initial={false}
            animate={isSearchActive ? { width: '300px', opacity: 1 } : { width: '0px', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }} // To handle the width animation cleanly
          >
<form action="" >
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper: " pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px] transition-all ${isSearchActive ? 'pl-8' : 'pl-0'} sm:w-[300px]",
          }}
          placeholder="Type to search..."
          size="sm"
         value={searchQuery}
         onChange={(e)=>setSearchQuery(e.target.value.toLowerCase())} 
         type="search"
          
        />
</form>
            {/* <Input
              type="search"
              placeholder="Search collections..."
              className={`transition-all ${isSearchActive ? 'pl-8' : 'pl-0'} sm:w-[300px]`}
            /> */}
            {/* <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" /> */}
          </motion.form>

          <Button variant="ghost" size="icon" onClick={() => {setIsSearchActive(!isSearchActive)
            setshowList(!showList)
            setSearchQuery(null)
          }}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          <Link to={'/cart-page'} variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5" />
            <span className="sr-only">Cart</span>
        
          </Link>

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
        </div>
      </div>
      {showList && searchQuery && (
        <div className="absolute bg-white shadow-lg w-full p-4">
          {filteredProducts.length > 0 ? (
            <ul>
              {filteredProducts.map(product => (
                <li key={product.id} className="py-2">
                  <Link to={`/product-page/${product.id}`} 
                  onClick={()=>{setshowList(false) 
                    setSearchQuery("")
                    setIsSearchActive(!isSearchActive)
                  }}
                  className=" flex hover:underline items-center space-x-4">
                  <img src={product.image} className='w-10 h-10' />
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>No results found for "{searchQuery}".</p>
          )}
        </div>
      )}
    </header>
  );
}
