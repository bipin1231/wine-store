import React from 'react';
import Header from './Header';
import Controls from './Controls';
// import StatsCards from './StatsCards';
import ProductList from './ProductList';
import ProductVariantImage from './ProductVariantImage';
import useManageProducts from './useManageProducts';

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
    imageData
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
       
        />
     
        <ProductList
          products={products}
          isEditing={isEditing}
          handleEditClick={handleEditClick}
          setIsImageModalOpen={setIsImageModalOpen}
          setModifiedProductVariant={setModifiedProductVariant}
          handleModifiedProductVariantChange={handleModifiedProductVariantChange}
        />
      </main>
      {isImageModalOpen  && (
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
