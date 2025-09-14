import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const categoryApi=createApi({
  reducerPath:"categoryApi",
  baseQuery:baseQueryWithAuth,
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
    }),
    deleteCategory:builder.mutation({
      query: id =>({
        url:`/category/${id}`,
        method:'DELETE',
      })
    }),
  })

})

export const {useGetCategoryQuery,useAddCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation}=categoryApi;