import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';
export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    getProducts: builder.query({
      query: () => 'product',
    }),
    getProductsBySizeAll: builder.query({
      query: () => 'product/product-size-all',
    }),
    getProductsNameListByName: builder.query({
      query: (query) => `product/search-list?query=${query}`,
    }),
    getProductsByName: builder.query({
      query: (query) => `product/search?query=${query}`,
    }),
    getProductsById: builder.query({
      query: (productId) => `product/${productId}`,
    }),
        getFilteredProducts: builder.query({
      query: (filteredData) => `product/filter-and-sort?categoryName=${filteredData?.categoryName}&sort=${filteredData?.sort}`,
    }),
    addProduct: builder.mutation({
      query: newProduct => {
        const formData = new FormData();

        formData.append("product", new Blob([JSON.stringify(newProduct.product)], { type: "application/json" }))

        newProduct.images.forEach(file => {
          formData.append("images", file)

        });
        return {
          url: '/product',
          method: 'POST',
          body: formData,
        }
      }
    }),
    updateProductSize: builder.mutation({
      query: (newSize) => {

        return {
          url: `/product/update-size-all`,
          method: 'PUT',
          body: newSize,
        }
      }
    }),
    updateProductInfo: builder.mutation({
      query: (newSize) => {

        return {
          url: `/product/update-product-all`,
          method: 'PUT',
          body: newSize,
        }
      }
    }),
    updateProductImage: builder.mutation({
      query: (newSize) => {

        return {
          url: "/product/update-product-image",
          method: 'PUT',
          body: newSize,
        }
      }
    }),


    deleteProductImage: builder.mutation({
      query: ({ id, name }) => {

        return {
          url: `/product/delete-image?id=${id}&name=${name}`,
          method: 'DELETE',

        }
      }
    }),

  })

})

export const { useGetProductsByNameQuery,
  useGetProductsNameListByNameQuery,
  useGetProductsBySizeAllQuery,
  useGetProductsQuery,
  useGetFilteredProductsQuery,
  useAddProductMutation, useUpdateProductSizeMutation, useGetProductsByIdQuery, useUpdateProductInfoMutation,
  useDeleteProductImageMutation,
  useUpdateProductImageMutation,

} = productApi;