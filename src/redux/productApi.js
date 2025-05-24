import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';
export const productApi=createApi({
  reducerPath:"productApi",
  baseQuery:baseQueryWithAuth,
  endpoints:builder=>({
    getProducts:builder.query({
      query:()=>'product',
    }),
    getProductsById:builder.query({
      query:(productId)=>`product/${productId}`,
    }),
    addProduct:builder.mutation({
      query: newProduct=>{
        const formData=new FormData();

        formData.append("product",new Blob([JSON.stringify(newProduct.product)], { type: "application/json" }))

        newProduct.images.forEach(file => {
          formData.append("images",file)
          
        });
        return{
        url:'/product',
        method:'POST',
        body:formData,
      }
    }
    }),
    updateProductSize:builder.mutation({
      query: ({id,newSize})=>{
  
        return{
        url:`/product/update-size/${id}`,
        method:'PUT',
        body:newSize,
      }
    }
    }),
  })

})

export const {useGetProductsQuery,useAddProductMutation,useUpdateProductSizeMutation,useGetProductsByIdQuery}=productApi;