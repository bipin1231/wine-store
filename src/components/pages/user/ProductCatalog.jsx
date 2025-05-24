import React, { useEffect, useState } from 'react';
import { Wine, Search, ShoppingCart, User, ChevronDown } from 'lucide-react';
import Products from '../../reusable/Products';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion"
import { Card, Button, CardBody } from '@nextui-org/react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from "@nextui-org/dropdown";
import api from '../../../api/axiosInstance';

import { useGetProductsQuery } from '../../../redux/productApi';
import {useGetCategoryQuery} from '../../../redux/categoryApi';

import CategoryDropdown from '../../reusable/CategoryDropdown';

// Simple replacements for custom UI components
// const Button = ({ children, variant, size, className, ...props }) => (
//   <button
//     className={`px-4 py-2 rounded ${
//       variant === 'ghost' ? 'bg-transparent' : 
//       variant === 'outline' ? 'border border-gray-300' : 'bg-blue-500 text-white'
//     } ${size === 'icon' ? 'p-2' : ''} ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${className}`}>
    {children}
  </span>
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

  const {data,error,isLoading}=useGetProductsQuery();

   const {data:category,isLoading:isCategoryLoading}=useGetCategoryQuery();

  console.log("fetched datataf",data);

  console.log("fetched category",category);

  
  

  // const [apiProduct,setApiProduct]=useState([]);

  // useEffect(()=>{
  //   api.get('/product')
  //   .then(res=> {
  //     console.log(res);
      
  //     setApiProduct(res.data)})
  //   .catch(err=>console.error(err));
  // },[]);



  const product = useSelector(state => state.products.items)
  const categories = useSelector(state => state.products.categories)


  const [filteredProducts, setFilteredProducts] = useState(product);
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [sortOrder, setSortOrder] = useState('name-a-z');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);





  // useEffect(() => {
  //   if (category) filterProducts(category || "All Products");
  // }, [])
  // console.log(product);


  // const filterProducts = (cat) => {

  //   setActiveCategory(cat);
  //   if (cat === 'All Products') {
  //     setFilteredProducts(product);
  //   } else {
  //     setFilteredProducts(product.filter(p => p.type.toLowerCase().includes(cat.toLowerCase()) || p.origin.toLowerCase().includes(cat.toLowerCase())));
  //   }
  // };



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

          {/* you ramrai xa aile backend check garnako laagi comment handeko ho........ */}
          {/* {categories.map((cat) => (
                
                <Dropdown backdrop="blur">
                <DropdownTrigger>
                
                    <Button>
                     {cat.name}
                    </Button>
            
            
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  {cat.subCategories.map((subCat)=>(
                  <DropdownItem 
                  key={subCat}
                  onClick={()=>filterProducts(subCat)}
                  >
                    {subCat}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
          ))} */}
</div>
          {/* <div className="flex items-center space-x-4">
            <Select value={sortOrder} onValueChange={sortProducts}>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="name-a-z">Name: A to Z</SelectItem>
              <SelectItem value="name-z-a">Name: Z to A</SelectItem>
            </Select>

            <Select value={product} onValueChange={filterProducts}>
              {['All Products', 'Wines', 'Accessories', 'Gift Sets', 'Red Wine', 'White Wine'].map((category) => (
                <SelectItem value={category}>{category}</SelectItem>
              ))
              }
            </Select>


          </div> */}
        </div>


        <AnimatePresence>
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >

            {/* yesma chai product haru list hunxa yesma paxi milamla  */}

            {/* {filteredProducts.map((product) => (

              <Products
                id={product.id}
                product={product}
              />
            ))} */}


                        { !isLoading ? ( data.map((product) => (

              <Products
                id={product.id}
                product={product}
              />
            ))): "Loading"}  
          </motion.div>
        </AnimatePresence>

                {
                    isLoading? (
                    <div>loading...........</div>
                  ):error?(
                    <div>errrorrr while fetching....</div>
                  ):(
                    data.map((a,i)=>(  <pre key={i}>{JSON.stringify(a, null, 2)}</pre>))
                    
                  )
                      
                }



        <div className="mt-12 flex justify-center">
          <Button variant="outline">Load More</Button>
        </div>
      </div>
    </main>

  );
};

export default ProductCatalog;