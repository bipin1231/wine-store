import React from 'react';
import Header from './Header';
import Controls from './Controls';
// import StatsCards from './StatsCards';
import ProductList from './ProductList';
import ProductVariantImage from './ProductVariantImage';
import useManageProducts from './useManageProducts';

import EditProductInfo from '../product/EditProductInfo';
const ManageProducts = () => {
  const {
    products,
    filteredProducts,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    isEditing,
    setIsEditing,
    isProductEditing,
    setIsProductEditing,
    activeTab,
    setActiveTab,
    isImageModalOpen,
    setIsImageModalOpen,
    currentProduct,
    setCurrentProduct,
    categories,
    handleEditClick,
    modifiedProductVariant,
    setModifiedProductVariant,
    handleModifiedProductVariantChange,
    handleSaveProductVariant,
    handleDeleteImage,
    handleNewImage,
    handleSaveImages,
    imageData,
    deleteProductVariant,
    deleteProduct,
    handleSaveEditProductInfo
  } = useManageProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Controls
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleSaveProductVariant={handleSaveProductVariant}
          setIsProductEditing={setIsProductEditing}
          isProductEditing={isProductEditing}

        />
        {
          !isProductEditing && (
            <ProductList
              products={products}
              isEditing={isEditing}
              handleEditClick={handleEditClick}
              setIsImageModalOpen={setIsImageModalOpen}
              setModifiedProductVariant={setModifiedProductVariant}
              handleModifiedProductVariantChange={handleModifiedProductVariantChange}
              deleteProductVariant={deleteProductVariant}
              deleteProduct={deleteProduct}
            />
          )
        }


        {
          isProductEditing && (
            <EditProductInfo 
            product={products}
            categories={categories}
            onSave={handleSaveEditProductInfo}
            />
          )
        }

      </main>
      {isImageModalOpen && (
        <ProductVariantImage
          currentProduct={currentProduct}
          setIsImageModalOpen={setIsImageModalOpen}
          handleDeleteImage={handleDeleteImage}
          handleSaveImages={handleSaveImages}
          handleNewImage={handleNewImage}
          imageData={imageData}
        />
      )}
    </div>
  );
};

export default ManageProducts;
