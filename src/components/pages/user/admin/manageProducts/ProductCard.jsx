import React from 'react';
import { FiImage, FiEdit } from 'react-icons/fi';
import { motion } from 'framer-motion';
import VariantTable from './VariantTable';

const ProductCard = ({ product, isEditing, handleEditClick,setIsImageModalOpen,handleModifiedProductVariantChange,deleteProductVariant,deleteProduct }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm"
    >
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium text-gray-800">{product.name}</h2>
            <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full">
              {product.categoryName}
            </span>
          </div>
          <p className="text-gray-500 text-sm mt-1">{product.description}</p>
        </div>
        <div>
          <button className='bg-red-500 rounded-md text-slate-50 p-2' onClick={()=>deleteProduct(product.id)}>Delete</button>
        </div>
      </div>
      <VariantTable 
      variants={product.productVariant} 
      isEditing={isEditing}
      handleEditClick={handleEditClick}
      setIsImageModalOpen={setIsImageModalOpen}
      handleModifiedProductVariantChange={handleModifiedProductVariantChange}
      deleteProductVariant={deleteProductVariant}
      />
    </motion.div>
  );
};

export default ProductCard;