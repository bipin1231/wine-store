import React, { useState } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Select from 'react-select';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Checkbox, Input, Button } from "@nextui-org/react";
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
  max-width: 700px;
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [variantImagesMap, setVariantImagesMap] = useState({});

  const [addProduct] = useAddProductMutation();
  const { data: categoriesData = [] } = useGetCategoryQuery();
  const categoryOptions = categoriesData.map(cat => ({ value: cat.name, label: cat.name }));

  const { register, handleSubmit, control, formState: { errors } } = useForm({ defaultValues: { sizeStocks: [] } });
  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({ control, name: 'sizeStocks' });

  const handleSizeCheckboxChange = (isChecked, size) => {
    if (isChecked) {
      appendSize({ label: size.label, size: size.value, stock: '' });
    } else {
      const idx = sizeFields.findIndex(f => f.size === size.value);
      if (idx >= 0) removeSize(idx);
      setVariantImagesMap(prev => {
        const copy = { ...prev };
        delete copy[idx];
        return copy;
      });
    }
  };

  const bottlePrice = size => {
    const sp = parseFloat(standardPrice) || 0;
    if (size === '180ml') return sp / 4;
    if (size === '375ml') return sp / 2;
    if (size === '750ml') return sp;
    return 0;
  };

  const bottleCostPrice = size => {
    const cp = parseFloat(cartonPrice) || 0;
    if (size === '180ml') return cp / 48;
    if (size === '375ml') return cp / 24;
    if (size === '750ml') return cp / 12;
    return 0;
  };

  const onSubmit = async formData => {
    const productSize = formData.sizeStocks.map((s, idx) => ({
      size: s.size,
      stock: Number(s.stock),
      sellingPrice: bottlePrice(s.size),
      costPrice: bottleCostPrice(s.size),
      images: variantImagesMap[idx] || []
    }));

    const payload = {
      product: {
        name: formData.name,
        category: formData?.category?.value,
        description: formData?.description,
        cartonPrice: formData.cartonPrice,
        productSize
      }
    };

    console.log("payload data", payload);

    try {
      await addProduct(payload).unwrap();
      toast.success('Product added!');
    } catch {
      toast.error('Failed to add product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <FormTitle>Add New Product</FormTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Product Name & Category */}
        <FormGroup>
          <Label>Product Name</Label>
          <Input {...register('name', { required: 'Product name is required' })} placeholder='Enter product name' />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label>Category</Label>
          <Controller name='category' control={control} rules={{ required: false }} render={({ field }) => <Select {...field} options={categoryOptions} placeholder='Select a category' />} />
          {errors.category && <ErrorMessage>Category is required</ErrorMessage>}
        </FormGroup>

        {/* Prices */}
        <div className='grid grid-cols-2 gap-4'>
          <FormGroup>
            <Label>Selling Price (MRP for 750ml)</Label>
            <Input type='number' onChange={e => setStandardPrice(e.target.value)} placeholder='Enter standard price' />
          </FormGroup>
          <FormGroup>
            <Label>Carton Cost Price</Label>
            <Input {...register('cartonPrice', { required: true })} type='number' onChange={e => setCartonPrice(e.target.value)} placeholder='Enter carton price' />
          </FormGroup>
        </div>

        {/* Size Selection */}
        <FormGroup>
          <Label>Available Sizes</Label>
          <div className='grid grid-cols-2 gap-2 mt-2'>
            {wineSizes.map(size => (
              <Checkbox key={size.value} onChange={e => handleSizeCheckboxChange(e.target.checked, size)}>{size.label}</Checkbox>
            ))}
          </div>
        </FormGroup>

        {/* Per-size inputs & images */}
        <div className='space-y-6'>
          {sizeFields.map((field, idx) => (
            <div key={field.id} className='p-4 border rounded-lg'>
              <h3 className='font-medium mb-2'>{field.label}</h3>
              <div className='flex gap-3 mb-4'>
                <Input type='number' {...register(`sizeStocks.${idx}.stock`, { required: true, min: { value: 0, message: 'Stock must be >= 0' } })} placeholder='Stock' />
                <Input type='number' value={bottlePrice(field.size)} readOnly placeholder='Selling Price' />
                <Input type='number' value={bottleCostPrice(field.size)} readOnly placeholder='Cost Price' />
              </div>

              <input type='file' multiple accept='image/*' onChange={e => {
                const files = Array.from(e.target.files);
                setVariantImagesMap(prev => ({
                  ...prev,
                  [idx]: [...(prev[idx] || []), ...files]
                }));
              }} />

              <div className='flex gap-2 flex-wrap mt-2'>
                {(variantImagesMap[idx] || []).map((file, i) => (
                  <div key={i} className='relative w-24 h-24'>
                    <img src={URL.createObjectURL(file)} alt='Preview' className='w-full h-full object-cover rounded' />
                    <button type='button' onClick={() => setVariantImagesMap(prev => {
                      const arr = [...(prev[idx] || [])]; arr.splice(i, 1);
                      return { ...prev, [idx]: arr };
                    })} className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1'>✕</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Description & Submit */}
        <FormGroup>
          <Label>Description</Label>
          <TextArea {...register('description', { required: false })} rows={4} placeholder='Enter description' />
          {errors.description && <ErrorMessage>Description is required</ErrorMessage>}
        </FormGroup>
        <Button type='submit' disabled={isSubmitting}>{isSubmitting ? 'Adding…' : 'Add Product'}</Button>
      </form>

      <ToastContainer position='top-right' autoClose={3000} />
    </FormContainer>
  );
}
