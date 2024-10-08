import React from 'react';
import { Button } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { addToCart } from "../../redux/cartSlice"; 
import { Link } from 'react-router-dom';

function Products({ product }) {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    dispatch(addToCart({ id: product.id, quantity: 1 }));
    console.log("Added to cart");
  };

  return (
    <div 
      key={product.id} 
      className="group relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group-hover:scale-105"
    >
      {/* Product Image */}
      <Link to={`/product-page/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-[300px] transition-transform group-hover:scale-105"
        />
     

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity group-hover:bg-opacity-50" />

      {/* Product Details */}
      <div className="absolute inset-x-0 bottom-0 p-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-sm text-gray-300">{product.type}</p>
        <p className="mt-2 text-sm font-bold text-white">${product.price.toFixed(2)}</p>
      </div>
      </Link>
      {/* Add to Cart Button */}
      <Button 
     onClick={addItemToCart}
      className="absolute bg-gray-400 rounded-md top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100">
                  Add to Cart
                </Button>

    </div>
  );
}

export default Products;
