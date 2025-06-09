import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';

function AddCategory({ categoryOptions, onSubmit }) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch
  } = useForm();

  // Watch the image input this is not needed as we not not using it
  //const imageFile = watch('image');
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    
  
    
    const file = e.target.files[0];
    console.log(e.target.files);
    
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      {/* Category Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('category', { required: 'Category name is required' })}
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.category ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter category name"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Parent Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Parent Category
        </label>
        <Controller
          name="parentCategory"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              options={categoryOptions}
              isClearable
              placeholder="Select a parent category"
              className="react-select-container"
              classNamePrefix="react-select"
            />
          )}
        />
      </div>

      {/* Image Upload with Preview */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Image <span className="text-red-500">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          {...register('image', { required: 'Image is required' })}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
          onChange={(e) => {
            handleImageChange(e);
          }}
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">
            {errors.image.message}
          </p>
        )}

        {/* Image Preview */}
        {preview && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-2">Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-40 h-40 object-cover rounded border"
            />
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition"
      >
        Add Category
      </button>
    </form>
  );
}

export default AddCategory;
