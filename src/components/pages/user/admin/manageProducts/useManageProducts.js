import { useState } from 'react';
import {  categories } from './dummyData';
import { useGetProductsQuery } from '../../../../../redux/productApi';
import { useUpdateProductVariantMutation,useUpdateProductVaraintImageMutation,useDeleteProductVariantMutation } from '../../../../../redux/productApi';

export default function useManageProducts() {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modifiedProductVariant,setModifiedProductVariant]=useState([]);
  const { data:products=[], error, isLoading } = useGetProductsQuery();
  const [updateProductVariantMutation] = useUpdateProductVariantMutation();
  const [updateProductVariantImageMutation] = useUpdateProductVaraintImageMutation();
  const [deleteProductVariantMutation] = useDeleteProductVariantMutation();


  const [imageData,setImageData]=useState([])





  const handleModifiedProductVariantChange = (id, field, value) => {
    setModifiedProductVariant((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  }; 

  const handleSaveProductVariant = async () => {
    const payload = Object.entries(modifiedProductVariant).map(([id, value]) => ({
      id: Number(id),
      ...value,
    }));

    console.log("dasssssss",payload);
    
    try {
      await updateProductVariantMutation(payload);
      console.log("updated.mojjj gar");
      
      setIsEditing(false);
      //setModifiedProductSize({});
    } catch (error) {
      console.error(error);
    }
  };

console.log(modifiedProductVariant);


  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.categoryName === selectedCategory);

  const handleEditClick = (product) => {

    
   setCurrentProduct(product);
setImageData(
  product.imageUrl.map((img) => ({
    file: null,
    url: img
  }))
);
setIsImageModalOpen(true);

  };


  const handleDeleteImage = (imgUrl) => {
  setImageData(prev => prev.filter(img => img.url !== imgUrl));
};


const handleNewImage = (e) => {
  const files = Array.from(e.target.files);
  const newImages = files.map(file => ({
    file,
    url: URL.createObjectURL(file), // for preview
  }));

  setImageData(prev => [...prev, ...newImages]);
};


   //this will handle both image delete and add new images
const handleSaveImages = async () => {
  if (!currentProduct) return;

  const existingImages = imageData
    .filter(img => img.file === null)
    .map(img => img.url);

  const newFiles = imageData
    .filter(img => img.file instanceof File)
    .map(img => img.file);

    console.log("Existing image",existingImages);
    console.log("new image data",newFiles);
    
    

  const formData = new FormData();
  formData.append('id', currentProduct.id);
  formData.append('existingImages', JSON.stringify(existingImages));
  newFiles.forEach(file => formData.append('newImages', file));

  // Send this to your backend
  try {
    const res = await updateProductVariantImageMutation(formData)
  console.log("hehhee updated successfully");
  
  } catch (err) {
    console.error('Failed to upload images:', err);
  }
};

const deleteProductVariant=async (id)=>{


try{
  await deleteProductVariantMutation(id)
  console.log("deleted successsfully");
  
}catch(e){
  console.log(e);
  
}
}



  return {
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
    handleSaveImages,
    handleNewImage,
    imageData,
    deleteProductVariant

  };
}
