import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { FaHeart, FaStar, FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useAddToCartMutation
} from "../../redux/cartApi";
import { toast } from "react-toastify";

// Enhanced Product Card Component
export default function ProductCard ({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isButtonDisabled,setIsButtonDisabled]=useState(false);
  const userInfo=useSelector(state=>state.users)
  
 
  
  const [addToCartMutation] = useAddToCartMutation();
const handleAddToCart=async(data)=>{
  console.log(data);
  console.log("hiii");
  
   if (!userInfo || !userInfo?.userInfo?.id) { 
    console.log("heeeeeyyyy");
      // check if user is logged in
    toast.error("Please login to add items to your cart!");
    return;
   }
   console.log("hellllooo");
   

   const payload={
    userId:userInfo.userInfo.id,
    productId:data.productId,
    productVariantId:data.productVariantId,
    quantity:1
   }
   console.log(payload);
   
  try {
    setIsButtonDisabled(true)
    await addToCartMutation(payload);
      console.log("aadeed to caert",data);
      toast.success("Login successful!");
  } catch (error) {
    console.log("cant add to cart",error);
  //  toast.error("Failed to Add to the Cart")
    
  }finally{
setIsButtonDisabled(false)
  }
}
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
          src={product.imageUrl}
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
                      onClick={(e) => {
              e.preventDefault(); // prevent default link behavior
              e.stopPropagation(); // stop the click from reaching the Link
               handleAddToCart(product);
          
              
            }
          }
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
        {/* <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <FaStar 
              key={i} 
              className={i < 4 ? "text-amber-400" : "text-gray-300"} 
              size={14} 
            />
          ))}
          <span className="text-sm text-gray-500 ml-2">(42)</span>
        </div> */}

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