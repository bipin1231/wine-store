import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGetProductsQuery, useUpdateProductInfoMutation, useUpdateProductSizeMutation,useDeleteProductImageMutation,useUpdateProductImageMutation } from '../../../../redux/productApi';
import { useGetCategoryQuery } from '../../../../redux/categoryApi';
import EditProductInfo from './product/EditProductInfo';

export default function ManageProducts() {
  const [isEditing, setIsEditing] = useState(false);
  const { data, error, isLoading } = useGetProductsQuery();
  const { data: categoryData } = useGetCategoryQuery();
  const [updateSize, { isLoading: isUpdateSizeLoading }] = useUpdateProductSizeMutation();
  const [updateProductInfoMutation]=useUpdateProductInfoMutation();
  const [deleteProductImageMutation]=useDeleteProductImageMutation()
  const [updateProductImageMutation]=useUpdateProductImageMutation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [modifiedProductSize, setModifiedProductSize] = useState({});
  const [isProductInfoEdit, setProductInfoEdit] = useState(false);

  console.log("dadasdad",data);
  
  const localManagedCategory = categoryData?.flatMap((cat) => {
    if (Array.isArray(cat.subcategories) && cat.subcategories.length > 0) {
      return cat?.subcategories?.map((sub) => ({
        id: sub.id,
        name: sub.name,
      }));
    } else {
      return [{ id: cat.id, name: cat.name }];
    }
  }) || [];

  const handleModifiedProductSizeChange = (id, field, value) => {
    setModifiedProductSize((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSaveAll = async () => {
    const payload = Object.entries(modifiedProductSize).map(([id, value]) => ({
      id: Number(id),
      ...value,
    }));
    try {
      await updateSize(payload);
      setIsEditing(false);
      setModifiedProductSize({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setModifiedProductSize({});
    setIsEditing(false);
  };

  const handleProductInfoEdit=async (productInfo)=>{
    console.log(productInfo);

    const payload=Object.entries(productInfo).map(([id,value])=>(
      {
        id:Number(id),
        ...value
      }
    ));
    console.log(payload);
    
    try {
     const res= await updateProductInfoMutation(payload);
     console.log(res);
     
      //setIsEditing(false);
     // setModifiedProductSize({});
    } catch (error) {
      console.error(error);
    }
    
    
  }

  useEffect(() => {
    if (data) {
      const uniqueCategories = [
        'All',
        ...Array.from(new Set(data.map((product) => product.categoryName))),
      ];
      setCategories(uniqueCategories);
      setProducts(data);
    }
  }, [data]);

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.categoryName === selectedCategory);
//not needed i updated my logic
  const onDeleteImage=async (id,name)=>{
    console.log(id,name);

    try {
      const res=await deleteProductImageMutation({id,name})
      console.log(res);
      
    } catch (error) {
      console.log(error);
      
    }
  }

  //this login will handle both image delete and add new images
const handleSaveImages=async (id,imageData)=>{
  console.log("data to send");
  console.log("id:",id);
  console.log("image data",imageData);

 const existingImages = imageData
  .filter(img => img.file === null)
  .map(img => img.url);

  // const newImage=imageData.filter(img => img.file !== null).map(img=>img.file)
  // console.log("new image to send",newImage);
  
  
const newFiles = imageData
  .filter(img => img.file instanceof File)
  .map(img => img.file);
  

const formData = new FormData();

formData.append('id', Number(id)); // e.g. 2
formData.append('existingImages', JSON.stringify(existingImages));

newFiles.forEach(file => {
  formData.append('newImages', file);
});
try {
     const res= await updateProductImageMutation(formData);
     console.log(res);
     
      //setIsEditing(false);
     // setModifiedProductSize({});
    } catch (error) {
      console.error(error);
    }
    

}


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <h2 className="text-3xl font-extrabold text-indigo-700 tracking-tight">
          Product Management
        </h2>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setProductInfoEdit(!isProductInfoEdit)}
            className="text-indigo-600 hover:text-indigo-900 font-medium transition"
            aria-expanded={isProductInfoEdit}
            aria-controls="editProductInfoSection"
          >
            {isProductInfoEdit ? 'Close Product Info' : 'Edit Product Info'}
          </button>

          <div>
            {isEditing ? (
              <div className="flex gap-3">
                <button
                  onClick={handleSaveAll}
                  disabled={isUpdateSizeLoading}
                  className="inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:bg-green-300 disabled:cursor-not-allowed transition"
                >
                  Save All
                </button>
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 transition"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      {isProductInfoEdit && (
        <div id="editProductInfoSection" className="bg-white rounded-lg shadow-md p-6">
          <EditProductInfo 
          product={data} 
          categories={localManagedCategory}
          onSave={handleProductInfoEdit}
          onDeleteImage={onDeleteImage}
          handleSaveImages={handleSaveImages}
          />
        </div>
      )}

      {/* Filter */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full max-w-xs border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
        >
          {categories?.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="space-y-6">
        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-medium">
            No products found.
          </p>
        ) : (
          filteredProducts?.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow bg-white"
            >
              <div className="bg-indigo-100 px-6 py-4 flex justify-between items-center border-b">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900">{product.name}</h3>
                  <p className="text-sm text-indigo-700">{product.categoryName}</p>
                </div>
                <div>
                  <span className="text-sm text-indigo-600 font-mono">ID: {product.id}</span>
                </div>
              </div>

              <div className="px-6 py-4 overflow-x-auto">
                <table className="w-full min-w-[600px] text-sm text-left text-gray-700">
                  <thead className="bg-indigo-50 text-indigo-700">
                    <tr>
                      <th className="py-3 px-4 font-semibold">Size</th>
                      <th className="py-3 px-4 font-semibold">Cost Price (Rs)</th>
                      <th className="py-3 px-4 font-semibold">Selling Price (Rs)</th>
                      <th className="py-3 px-4 font-semibold">Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product?.productVariant?.map((size, index) => (
                      <tr
                        key={index}
                        className="border-b last:border-none hover:bg-indigo-50 transition-colors"
                      >
                        <td className="py-3 px-4 font-medium text-indigo-900">{size.size}</td>
                        {isEditing ? (
                          <>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                defaultValue={size.costPrice}
                                onChange={(e) =>
                                  handleModifiedProductSizeChange(
                                    size.id,
                                    'costPrice',
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                defaultValue={size.sellingPrice}
                                onChange={(e) =>
                                  handleModifiedProductSizeChange(
                                    size.id,
                                    'sellingPrice',
                                    e.target.value
                                  )
                                }
                                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                              />
                            </td>
                            <td className="py-2 px-4">
                              <input
                                type="text"
                                defaultValue={size.stock}
                                onChange={(e) =>
                                  handleModifiedProductSizeChange(size.id, 'stock', e.target.value)
                                }
                                className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                              />
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-3 px-4">{size.costPrice}</td>
                            <td className="py-3 px-4">{size.sellingPrice}</td>
                            <td className="py-3 px-4">{size.stock}</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
