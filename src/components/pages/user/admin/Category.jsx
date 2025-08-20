import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useGetCategoryQuery, useAddCategoryMutation, useUpdateCategoryMutation,useDeleteCategoryMutation } from '../../../../redux/categoryApi';
import Select from 'react-select';
import AddCategory from './category/AddCategory';
import ListCategory from './category/ListCategory';


function Category() {
  const { data, isLoading, error,refetch } = useGetCategoryQuery();
  const [updateCategoryMutation]=useUpdateCategoryMutation();
  const [addCategoryMutation] = useAddCategoryMutation();
  const [deleteCategoryMutation] = useDeleteCategoryMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddCategory,setIsAddCategory] = useState(false);

  const categoryOptions = data?.map((d) => ({
    label: d.name,
    value: d.name
  })) || [];
console.log(data);

  const onSubmit = async (formData) => {
   console.log('Raw formData:', formData);



  const payload = {
    category: formData.category,
    parentCategory: formData?.parentCategory?.value || null,
    image: formData.image[0], // ✅ grab the first selected file
  };
  console.log("payload issssp",payload);
  

  const data=new FormData();
  data.append('category',payload.category)
  data.append('parentCategory',payload.parentCategory)
  if(payload.image)
  data.append('image',payload.image)

    try {
      await addCategoryMutation(data);
    refetch();
      
    } catch (error) {
      console.log(error);
      
    }
    // You can use addCategory(formData) here if needed
  };

  const handleSaveAll= async (data)=>{
    console.log("sending to bacakend",data);

const formData = new FormData();
data.forEach((item, index) => {
  if(item.id)
  formData.append(`categoryList[${index}].id`, item.id);
if( item?.name)
  formData.append(`categoryList[${index}].name`, item?.name);
if(item?.description)
  formData.append(`categoryList[${index}].description`, item?.description);
  if (item.img) {
    formData.append(`categoryList[${index}].image`, item?.img);
  }
});




       try {
     const res= await updateCategoryMutation(formData);
     console.log("rsponse from the server",res);
     
         refetch();

    } catch (error) {
      console.log(error);
      
    }
  }

  const handleCategoryDelete=async(id)=>{
    console.log(id);
    try{
      await deleteCategoryMutation(id)
      console.log("category deleted successfully");
      refetch();
      
    }catch(e){
      console.log(e);
      
    }
    
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Categories</h2>

      {isLoading && <p className="text-gray-500">Loading categories...</p>}
      {error && <p className="text-red-500">Failed to load categories.</p>}

      <div className="space-y-2">
        {data ? (
          data.map((category, i) => (
            <div key={i} className="text-lg text-gray-700">
              • {category.name}
            </div>
          ))
        ) : (
          <div className="text-red-500">Something went wrong.</div>
        )}
      </div>

      <div className="flex space-x-4 items-center">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:underline"
          >
            Edit
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="text-red-500 hover:underline"
            >
              Cancel
            </button>
            <button className="text-green-600 hover:underline">Update</button>
          </>
        )}
      </div>
      {
        !isAddCategory?<span onClick={()=>setIsAddCategory(true)}>Add Category</span>:<span onClick={()=>setIsAddCategory(false)}>Cancel</span>
      }
      
<div>
  {
    isAddCategory? <AddCategory
   categoryOptions={categoryOptions}
  onSubmit={onSubmit}
  />:<></>
  }
 
</div>
<div>
  <ListCategory
  categories={data}
  isEditing={isEditing}
  onSaveAll={handleSaveAll}
  onDelete={handleCategoryDelete}
  />
</div>
   
    </div>
  );
}

export default Category;
