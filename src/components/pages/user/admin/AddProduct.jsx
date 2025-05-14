import React, { useEffect, useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Checkbox, Input, Button} from "@nextui-org/react";
import { useGetCategoryQuery } from '../../../../redux/categoryApi';
import { useAddProductMutation } from '../../../../redux/productApi';
const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

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
  const [standardPrice, setStandardPrice] = useState('');
  const [cartonPrice, setCartonPrice] = useState('');
  const [imageFile, setImageFile] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addProduct]=useAddProductMutation();
  const { data, isLoading } = useGetCategoryQuery();
  const categoryOptions = data?.map(cat => ({
    value: cat.name,
    label: cat.name
  })) || [];

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const { fields: sizeFields, append, remove } = useFieldArray({
    control,
    name: "sizeStocks"
  });

  const { fields: imageFields, append: addImage, remove: removeImage } = useFieldArray({
    control,
    name: "images"
  });

  const handleSizeCheckboxChange = (isChecked, size) => {
    if (isChecked) {
      append({ label: size.label, size: size.value, stock: "" });
    } else {
      const index = sizeFields.findIndex(field => field.label === size.label);
      if (index >= 0) remove(index);
    }
  };

  const handleImageChange = (files) => {
    Array.from(files).forEach(file => addImage({ file }));
  };

  const bottlePrice = (size) => {
    const sp = parseFloat(standardPrice) || 0;
    if (size === '180ml') return sp / 4;
    if (size === '375ml') return sp / 2;
    if (size === '750ml') return sp;
    return 0;
  };

  const bottleCostPrice = (size) => {
    const cp = parseFloat(cartonPrice) || 0;
    if (size === '180ml') return cp / 48;
    if (size === '375ml') return cp / 24;
    if (size === '750ml') return cp / 12;
    return 0;
  };

  const onSubmit = async (formData) => {
    console.log(formData);
    
    const productData = {
      name: formData.name,
      category: formData.category?.value,
      description: formData.description,
      cartoonPrice:formData.cartoonPrice,
      productSize: sizeFields.map((field, index) => ({
        size: field.size,
        stock: Number(formData.stocks?.[index] || 0),
        sellingPrice: bottlePrice(field.size),
        costPrice: bottleCostPrice(field.size),
      }))
    };
    const payload={
      product:productData,
      images:formData.images.map(img=>img.file)
    }

    console.log("Final Payload:", payload);

    await addProduct(payload)
    .unwrap()
    .then(() => toast.success("Product added!"))
    .catch(() => toast.error("Failed to add product"));
    // Submit logic here...
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      
      <FormTitle>Add New Product</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>Product Name</Label>
          <Input
            {...register("name", { required: "Product name is required" })}
            placeholder="Enter product name"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Category</Label>
          <Controller
            name="category"
            control={control}
           // rules={{ required: "Category is required" }}
            render={({ field }) => (
              <Select
                {...field}
                options={categoryOptions}
                placeholder="Select a category"
              />
            )}
          />
          {errors.category && <ErrorMessage>{errors.category.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Selling Price (MRP for 750ml)</Label>
          <Input
          
            type="number"
            onChange={(e) => setStandardPrice(e.target.value)}
            placeholder="Enter standard price"
          />
        </FormGroup>

        <FormGroup>
          <Label>Carton Cost Price</Label>
          <Input
            {...register("cartoonPrice")}
            type="number"
            onChange={(e) => setCartonPrice(e.target.value)}
            placeholder="Enter carton price"
          />
        </FormGroup>

        <FormGroup>
          <Label>Available Sizes</Label>
          <div className="grid grid-cols-3 gap-3 mt-3">
            {wineSizes.map(size => (
              <Checkbox
                key={size.value}
                onChange={(e) => handleSizeCheckboxChange(e.target.checked, size)}
              >
                {size.label}
              </Checkbox>
            ))}
          </div>
        </FormGroup>

        <div className="space-y-3">
          {sizeFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 items-center">
              <Input
                type="number"
                {...register(`stocks.${index}`, { min: { value: 0, message: "Stock must be positive" } })}
                label={field.label}
                placeholder="Enter stock"
              />
              <Input
                type="number"
                value={bottlePrice(field.size)}
                label="Selling Price"
                
              />
              <Input
                type="number"
                value={bottleCostPrice(field.size)}
                label="Cost Price"
                
              />
            </div>
          ))}
        </div>

        <FormGroup>
          <Label>Description</Label>
          <TextArea
            {...register("description", { required: "Description is required" })}
            placeholder="Enter product description"
            rows={4}
          />
          {errors.description && <ErrorMessage>{errors.description.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label>Product Image</Label>
          <Input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleImageChange(e.target.files)}
          />
        </FormGroup>

        <div className="mt-4 flex gap-2 flex-wrap">
          {imageFields.map((field, index) => (
            <div key={field.id} className="relative group h-24 w-24 overflow-hidden rounded-lg shadow-md border">
              <img
                src={URL.createObjectURL(field.file)}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="bg-red-500 text-white rounded-full p-1.5"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" isDisabled={isSubmitting}>
          {isSubmitting ? 'Adding Product...' : 'Add Product'}
        </Button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </FormContainer>
  );
}
