import React from 'react'
import {
  Minus,
  Plus,
} from "lucide-react";

function ProductCard({product,handleQuantityChange}) {
  return (
    <div className="flex items-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 overflow-hidden rounded-xl">
                      <img src={product.imageUrl} alt={product.name} className="object-cover w-full h-full" />
                    </div>
                    <div className="ml-4 md:ml-6 flex-1">
                      <h3 className="font-medium text-[#2c2c2c]">{product.name}</h3>
                      <p className="text-sm text-[#8b5a2b] mt-1">{product.size}</p>
                      <p className="text-lg font-medium text-[#2c2c2c] mt-2">Rs.{product?.sellingPrice|| product.productPrice}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            className="h-8 w-8 flex items-center justify-center text-[#8b5a2b] hover:bg-[#f8f7f4] transition-colors"
                            aria-label="Decrease quantity"
                            onClick={() => handleQuantityChange(product?.productSizeId,product.quantity - 1,product?.cartItemId)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 font-medium text-sm">{product.quantity}</span>
                          <button
                            className="h-8 w-8 flex items-center justify-center text-[#8b5a2b] hover:bg-[#f8f7f4] transition-colors"
                            aria-label="Increase quantity"
                            onClick={() => handleQuantityChange(product?.productSizeId,product.quantity + 1,product?.cartItemId)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-lg font-medium text-[#2c2c2c]">Rs.{(product.sellingPrice * product.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
  )
}

export default ProductCard
