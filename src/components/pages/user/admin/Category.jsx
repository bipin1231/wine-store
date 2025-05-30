import React from 'react'
import { useForm } from 'react-hook-form';
import { useGetCategoryQuery,useAddCategoryMutation } from '../../../../redux/categoryApi'
function Category() {
  const {data,isLoading,error}=useGetCategoryQuery();
  const [addCategory]=useAddCategoryMutation();
  console.log(data);
  
    const { register, handleSubmit, control, formState: { errors } } = useForm();
  
  return (
    <>
  {
    data ? data.map((category,i)=><h1 key={i}>{category.name}</h1>):<>Something went wrong</>
  }
  <form action="">
  <label>Category Name</label>
          <input
            {...register("name", { required: "category name is required" })}
            placeholder="Enter category name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

 <label>Parent Category</label>

{/* add dropdown for the parent category */}
          <input
            {...register("parentName")}
            placeholder="Enter category name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}


  </form>

    </>
  )
}

export default Category
