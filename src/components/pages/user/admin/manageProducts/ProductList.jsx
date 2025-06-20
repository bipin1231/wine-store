import React from 'react';
import ProductCard from './ProductCard';
import { FiFilter } from 'react-icons/fi';

const ProductList = ({ products, isEditing, handleEditClick,   setIsImageModalOpen,setModifiedProductVariant,handleModifiedProductVariantChange,deleteProductVariant }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
        <div className="mx-auto w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
          <FiFilter className="text-indigo-500 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-800 mb-1">No products found</h3>
        <p className="text-gray-500 max-w-md mx-auto">
          Try changing your category filter or search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isEditing={isEditing}
          handleEditClick={handleEditClick}
          setIsImageModalOpen={setIsImageModalOpen}
          setModifiedProductVariant={setModifiedProductVariant}
          handleModifiedProductVariantChange={handleModifiedProductVariantChange}
          deleteProductVariant={deleteProductVariant}
        />
      ))}
    </div>
  );
};

export default ProductList;