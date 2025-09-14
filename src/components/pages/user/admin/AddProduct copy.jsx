import React, { useEffect, useState } from 'react';
import { useForm, Controller,useFieldArray } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {Checkbox,Input,Button,Label,TextArea} from "@nextui-org/react";
import { useGetCategoryQuery } from '../../../../redux/categoryApi';

const FormContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
`;




const ErrorMessage = styled.p`
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
`;



const wineSizes = [
  { value: '180ml', label: 'Split (180ml)' },
  { value: '375ml', label: 'Half Bottle (375ml)' },
  { value: '750ml', label: 'Standard (750ml)' },
  { value: '1.5L', label: 'Litre (1L)' },

];

export default function AddProduct() {
 // const {data,error,isLoading}=useGetProductsQuery();

 const [category,setCategory]=useState([])

   const {data,error,isLoading}=useGetCategoryQuery();
   if(isLoading) console.log("loadingadad");
  let categoryOption;
 if(data){
  categoryOption=data.map(cat=>({
    value:cat.name,
    label:cat.name
  }))
  console.log(categoryOption);
  
 }
  const { register, handleSubmit, control, setValue, watch, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cartonPrice,setCartonprice]=useState()
  const [standardPrice,setStandardprice]=useState("")
  const [imageFile,setImageFile]=useState([]);


  const onSubmit = async (formData) => {
console.log("entered form data",formData);

    const payload = {
      name: formData.name,
      category: formData.category?.value,
      description: formData.description,
      productSize : fields.map((field, index) => ({
        size: field.size,
        stockQuantity: Number(formData.stocks?.[index] || 0),
        sellingPrice: Number(bottlePrice(field.size)),
        costPrice: Number(bottleCostPrice(field.size)),
      }))
    }
      console.log("managed entered data",payload);
      
  };

  const { fields: imageFields, append: addImage, remove: removeImage } = useFieldArray({ control, name: "images" });
  const handleImageChange=(file)=>{
    const files = Array.from(file);
    files.forEach((file) => addImage({ file }));
  }

  
  const {fields,append,remove}=useFieldArray({
    control,
    name:"sizeStocks",
  })



  const handleSizeCheckboxChange=(isChecked,size)=>{
    
      if(isChecked){
        append({label:size.label,size:size.value,stock:""})
      }
      else{
        const index = fields.findIndex(field => field.label === size.label);
        if (index >= 0) remove(index); 
      }
  }

  const bottlePrice=(size)=>{

    
        if(size==="180ml") return standardPrice/4;
        if(size==="375ml") return standardPrice/2;
        if(size==="750ml") return standardPrice;
        return 0;

  }
  const bottleCostPrice=(size)=>{
 
    
        if(size==="180ml") return cartonPrice/48;
        if(size==="375ml") return cartonPrice/24;
        if(size==="750ml") return cartonPrice/12;
        return 0;

  }


  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FormTitle>Add New Product</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            {...register("name", {/* required: "Product name is required" */})}
            placeholder="Enter product name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="category">Category</Label>
          <Controller
            name="category"
            control={control}
          //  rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={categoryOption}
                placeholder="Select a category"
              />
            )}
          />
          {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Selling Price (MRP)</Label>
          <Input
            id="sp"
            type="number"
            {...register("sellingPrice", { 
             /* required: "Price is required",*/
              min: { value: 0, message: "Price must be positive" }
            })}
            placeholder="Enter Standard Bottle (750ml) price"
            onChange={(e)=>setStandardprice(e.target.value)}
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="price">Cost Price (Enter Carton Price)</Label>
          <Input
            id="cp"
            type="costPrice"
            {...register("price", { 
            /*  required: "Price is required",*/
              min: { value: 0, message: "Price must be positive" }
            })}
            placeholder="Enter price"
            onChange={(e)=>setCartonprice(e.target.value)}
          />
          {errors.price && <ErrorMessage>{errors.price.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Available Sizes and Stock</Label>
          <div className='grid grid-cols-3 gap-3 mt-3'>
          <Controller
            name="sizeStocks"
            control={control}
            //rules={{ required: "At least one size must be selected" }}
            render={({ field }) => (
             wineSizes.map(size=>
              <Checkbox
              key={size.value}
              color="default"
            
              onChange={(e)=>handleSizeCheckboxChange(e.target.checked,size)
              }
            
              >
                {size.label}
              </Checkbox>
             )
            )}
          />

        
          </div>
          {errors.sizeStocks && <ErrorMessage>{errors.sizeStocks.message}</ErrorMessage>}
        </FormGroup>

        {/* We'll add individual stock inputs dynamically based on selected sizes */}
        <div className='space-y-3'>
        {  fields.map((field,index)=>(
        <div
        id={field.id}
        className='flex flex-row gap-3'
        >
        <Input
     
        type="number"
        {...register("stocks", { 
      
          min: { value: 0, message: "Price must be positive" }
        })}
        label={field.label}
        labelPlacement="outside-left"
        placeholder="Enter Stocks for "
        className=''
      />
        <Input

        type="number"
        {...register("singleBottlePrice", { 
         // required: "Price is required",
          min: { value: 0, message: "Price must be positive" }
        })}
        label="Selling Price"
        labelPlacement="outside-left"
     
        value={bottlePrice(field.size)}
      />
        <Input

        type="number"
        {...register(`singleBottleCostPrice ${field.size}`, { 
         // required: "Price is required",
          min: { value: 0, message: "Price must be positive" }
        })}
        label="Cost Price"
        labelPlacement="outside-left"
     
        value={bottleCostPrice(field.size)}
      />
    </div>
        
        ))
         }
         </div>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <TextArea
            id="description"
            {...register("description", {
              // required: "Description is required" 
              })}
            placeholder="Enter product description"
            rows={4}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="image">Product Image</Label>
          <Input
            id="image"
            type="file"
            multiple
            {...register("image", { required: "Product image is required" })}
            accept="image/*"
            onChange={(e)=>handleImageChange(e.target.files)}
          />

          {errors.image && <ErrorMessage>{errors.image.message}</ErrorMessage>}
        </FormGroup>

                    
        <div className="mt-4 flex gap-2">
  {imageFields.map((field, index) => (
    <div
      key={field.id}
      className="relative group h-24 w-24 overflow-hidden rounded-lg shadow-md border border-gray-200 transition-transform duration-200 hover:scale-105"
    >
      <img
        src={URL.createObjectURL(field.file)}
        alt="Product Preview"
        className="h-full w-full object-cover rounded-md"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={() => removeImage(index)}
          className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition duration-200 shadow-lg"
        >
          ✕
        </button>
      </div>
    </div>
  ))}
</div>



        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </FormContainer>
  );
}