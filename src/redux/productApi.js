import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productApi=createApi({
  reducerPath:"productApi",
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:9090'}),
  endpoints:builder=>({
    getProducts:builder.query({
      query:()=>'product',
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
  })

})

export const {useGetProductsQuery,useAddProductMutation}=productApi;