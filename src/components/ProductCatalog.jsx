import React, { useEffect, useState } from 'react';
import { Wine, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import Products from './reusable/Products';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// Simple replacements for custom UI components
const Button = ({ children, variant, size, className, ...props }) => (
  <button
    className={`px-4 py-2 rounded ${
      variant === 'ghost' ? 'bg-transparent' : 
      variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white'
    } ${size === 'icon' ? 'p-2' : ''} ${className}`}
    {...props}
  >
    {children}
  </button>
);



const Select = ({ children, value, onValueChange }) => (
  <select value={value} onChange={(e) => onValueChange(e.target.value)} className="px-3 py-2 border rounded">
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);




const ProductCatalog = () => {
  const product=useSelector(state=>state.products.items)
  const [filteredProducts, setFilteredProducts] = useState(product);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [sortOrder, setSortOrder] = useState('name-a-z');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {category}=useParams()
  console.log(category);
  


  useEffect(()=>{
    if(category) filterProducts(category || "All Products");
  },[])
  console.log(product);
  

  const filterProducts = (cat) => {
    console.log("cat is here",cat);
    
    setActiveCategory(cat);
    if (cat === 'All Products') {
      setFilteredProducts(product);
    } else {
      setFilteredProducts(product.filter(p => p.type.toLowerCase().includes(cat.toLowerCase())));
    }
  };
 
  

  const sortProducts = (order) => {
    setSortOrder(order);
    let sortedProducts = [...filteredProducts];
    switch (order) {
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-a-z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-z-a':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  return (
  
      <main className="flex-1 ml-6">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <h1 className="text-3xl font-bold mb-8">Our Products</h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4">
              {['All Products', 'Wine','Whisky', 'Accessories', 'Gift Sets'].map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat? "default" : "outline"}
                  onClick={() => filterProducts(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <Select value={sortOrder} onValueChange={sortProducts}>
                <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                <SelectItem value="name-a-z">Name: A to Z</SelectItem>
                <SelectItem value="name-z-a">Name: Z to A</SelectItem>
              </Select>

              <Select value={product} onValueChange={filterProducts}>
              {['All Products', 'Wines', 'Accessories', 'Gift Sets','Red Wine','White Wine'].map((category) => (
                <SelectItem value={category}>{category}</SelectItem>
              ))
            }
              </Select>
              
            
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
         
            {filteredProducts.map((product) => (

              <Products 
              id={product.id}
              product={product}
              />
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </div>
      </main>

  );
};

export default ProductCatalog;