import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQuery';

export const cartApi=createApi({
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
    getCart:builder.query({
      query:()=>'cart',
    })
  })

})

export const {useGetCartQuery,useAddCategoryMutation}=cartApi;