import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoryApi=createApi({
  reducerPath:"categoryApi",
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:9090'}),
  endpoints:builder=>({
    addCategory:builder.mutation({
      query: newCategory=>({
        url:'/category',
        method:'POST',
        body:newCategory,
      })
    }),
    getCategory:builder.query({
      query:()=>'category',
    })
  })

})

export const {useGetCategoryQuery,useAddCategoryMutation}=categoryApi;