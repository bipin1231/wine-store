import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';
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
        getBestSellingProduct: builder.query({
      query: () => `product/best-selling`,
    }),
        getFilteredProducts: builder.query({
      query: (filteredData) => `product/filter-and-sort?categoryName=${filteredData?.categoryName}&sort=${filteredData?.sort}`,
    }),
    addProduct: builder.mutation({
      query: newProduct => {
        
        return {
          url: '/product',
          method: 'POST',
          body: newProduct,
        }
      }
    }),
    deleteProduct: builder.mutation({
      query: id => {
        
        return {
          url: `/product/${id}`,
          method: 'DELETE',
    
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
    updateProductVariant: builder.mutation({
      query: (newVariant) => {

        return {
          url: `/product/variant/update`,
          method: 'PUT',
          body: newVariant,
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
    updateProductVaraintImage: builder.mutation({
      query: (newSize) => {

        return {
          url: "/product/variant/update-image",
          method: 'PUT',
          body: newSize,
        }
      }
    }),


    deleteProductVariant: builder.mutation({
      query: ( id ) => {

        return {
          url: `/product/variant/${id}`,
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
  useGetBestSellingProductQuery,
  useAddProductMutation, useUpdateProductSizeMutation, useGetProductsByIdQuery, useUpdateProductInfoMutation,
  useDeleteProductVariantMutation,
  useUpdateProductImageMutation,
  useUpdateProductVariantMutation,
  useUpdateProductVaraintImageMutation,
  useDeleteProductMutation,

} = productApi;