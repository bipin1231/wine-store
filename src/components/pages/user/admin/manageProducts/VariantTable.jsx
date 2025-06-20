import React from 'react';
import ProductVariantImage from '../product/ProductVariantImage';
import useManageProducts from './useManageProducts';
import { FiImage, FiEdit } from 'react-icons/fi';
const VariantTable = ({ variants,handleEditClick, isEditing,setIsImageModalOpen,handleModifiedProductVariantChange }) => {
 
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 text-gray-500 text-sm">
          <tr>
            <th className="py-3 px-5 text-left font-medium">Size</th>
            <th className="py-3 px-5 text-right font-medium">Cost Price</th>
            <th className="py-3 px-5 text-right font-medium">Selling Price</th>
            <th className="py-3 px-5 text-right font-medium">Stock</th>
            <th className="py-3 px-5 text-right font-medium">Profit</th>
            <th className="py-3 px-5 text-right font-medium">Image</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 text-sm">
          {variants.map((variant) => (
            <tr key={variant.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-5 font-medium">
                <div className="flex items-center gap-2">
                  {variant.size}
                  {variant.stock === 0 && (
                    <span className="text-xs text-rose-500 bg-rose-50 px-2 py-0.5 rounded">
                      Out of stock
                    </span>
                  )}
                </div>
              </td>
              {isEditing ? (
                <>
                  <td className="py-3 px-5">
                    <div className="flex justify-end">
                      <input
                        type="number"
                        defaultValue={variant.costPrice}
                        onChange={e=>handleModifiedProductVariantChange(variant.id,"costPrice",e.target.value)}
                        
                        className="w-28 text-right py-1 px-3 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex justify-end">
                      <input
                        type="number"
                        defaultValue={variant.sellingPrice}
                          onChange={e=>handleModifiedProductVariantChange(variant.id,"sellingPrice",e.target.value)}
                        className="w-28 text-right py-1 px-3 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex justify-end">
                      <input
                        type="number"
                        defaultValue={variant.stock}
                          onChange={e=>handleModifiedProductVariantChange(variant.id,"stock",e.target.value)}
                        className="w-20 text-right py-1 px-3 border border-gray-200 rounded focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="py-3 px-5 text-right text-gray-700">
                    Rs. {variant.costPrice.toLocaleString()}
                  </td>
                  <td className="py-3 px-5 text-right font-medium text-indigo-600">
                    Rs. {variant.sellingPrice.toLocaleString()}
                  </td>
                  <td
                    className={`py-3 px-5 text-right ${
                      variant.stock < 5 ? 'text-amber-600' : 'text-gray-700'
                    }`}
                  >
                    {variant.stock} units
                  </td>
                </>
              )}
              <td className="py-3 px-5 text-right">
                <span className="text-emerald-600 font-medium">
                  Rs. {(variant.sellingPrice - variant.costPrice).toLocaleString()}
                </span>
              </td>
             
              
                 <td className="py-3 px-5 text-right">
                      <button
            onClick={() => handleEditClick(variant)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 hover:bg-gray-50 rounded-lg transition"
          >
            <FiImage size={16} /> Images
          </button>
                 
              </td>
            </tr>
             
          ))}
        </tbody>
      </table>
      
    </div>
  );
};

export default VariantTable;
