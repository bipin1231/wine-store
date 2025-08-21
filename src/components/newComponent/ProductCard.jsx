 import React,{useState} from "react";
 import { FaSearch, FaMapMarkerAlt, FaUser, FaHeart, FaShoppingCart, FaStar,FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
 // Enhanced Product Card Component
export default function ProductCard({ product }){

  
  const [isHovered, setIsHovered] = useState(false);
  

  return (
    <Link
    to={`/product-page/${product.productId}`}
    >
    <div 
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl w-full max-w-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative pt-[100%] bg-gray-50 overflow-hidden">
        <img 
         src={`http://localhost:8080/images/${product.imageUrl}`}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover p-6 transition-transform duration-500 group-hover:scale-110"
          // onError={(e) => e.target.src = "https://via.placeholder.com/300x300?text=Product+Image"}
        />
        
        {/* Add to Cart Button - Appears on hover */}
        <button
          className={`absolute bottom-4 right-4 bg-gray-900 text-white rounded-full p-3 shadow-lg transform transition-all duration-300 ${
            isHovered 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-2 opacity-0'
          } hover:scale-105 hover:bg-gray-700`}
          aria-label="Add to cart"
          onClick={(e)=>{
                e.preventDefault(); // prevent default link behavior
    e.stopPropagation(); // stop the click from reaching the Link

            console.log("item added to cart")
          }
          }
        >
          <FaPlus size={16} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        {/* Name & Price Row */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-gray-900 text-lg line-clamp-1">{product.productName}</h3>
   
        </div>

        {/* Size & Action */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
            {product.size}
          </span>
          <span className="text-sm text-gray-500 px-3 py-1 bg-gray-100 rounded-full">
    Rs.{product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
    </Link>
  );
}