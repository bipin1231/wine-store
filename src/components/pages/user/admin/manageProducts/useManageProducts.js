import { useState } from 'react';

import { useGetProductsQuery } from '../../../../../redux/productApi';
import { useUpdateProductVariantMutation,useUpdateProductVaraintImageMutation,useDeleteProductVariantMutation,useDeleteProductMutation,useUpdateProductInfoMutation } from '../../../../../redux/productApi';
import { useGetCategoryQuery } from '../../../../../redux/categoryApi';

export default function useManageProducts() {
  const [isEditing, setIsEditing] = useState(false);
  const [isProductEditing, setIsProductEditing] = useState(false);
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
  const [deleteProductMutation] = useDeleteProductMutation();
  const {data:categories=[]}=useGetCategoryQuery();
  const [updateProductInfoMutation]=useUpdateProductInfoMutation()


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

    try {
      await updateProductVariantMutation(payload);
  
      
      setIsEditing(false);
      //setModifiedProductSize({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveEditProductInfo = async (data) => {
    const payload = Object.entries(data).map(([id, value]) => ({
      id: Number(id),
      ...value,
    }));

    try {
   
      
     await updateProductInfoMutation(payload);
     console.log("updated product info",payload);
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
const deleteProduct = async (id) => {
  console.log("product id",id);
  const confirmDelete = window.confirm("Are you sure you want to delete this product?");


  if (!confirmDelete) {
    console.log("Deletion cancelled.");
    return;
  }

  try {
    await deleteProductMutation(id);
    console.log("Deleted successfully");
  } catch (e) {
    console.log("Error while deleting:", e);
  }
};




  return {
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
    handleSaveImages,
    handleNewImage,
    imageData,
    deleteProductVariant,
    deleteProduct,
    handleSaveEditProductInfo

  };
}
