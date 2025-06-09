import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const categoryApi=createApi({
  reducerPath:"categoryApi",
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8080'}),
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
    }),
    updateCategory:builder.mutation({
      query: data =>({
        url:'/category/update-all',
        method:'PUT',
        body:data,
      })
    })
  })

})

export const {useGetCategoryQuery,useAddCategoryMutation,useUpdateCategoryMutation}=categoryApi;