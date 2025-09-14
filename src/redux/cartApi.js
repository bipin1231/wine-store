import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const cartApi=createApi({
  reducerPath:"cartApi",
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8080/',
     credentials: 'include', // send cookies automatically

  }),

  endpoints:builder=>({
    addToCart:builder.mutation({
      query: cartItem=>({
        url:'/cart/add',
        method:'POST',
        body:cartItem,
      })
    }),
    deleteCartItem:builder.mutation({
      query: cartItemId=>({
        url:`/cart/delete/${cartItemId}`,
        method:'DELETE',
       
      })
    }),
    updateCartItem:builder.mutation({
      query: ({cartItemId,quantity})=>({
        url:`/cart/update?cartItemId=${cartItemId}&quantity=${quantity}`,
        method:'PUT',
       
      })
    }),
    getCart:builder.query({
      query:(data)=>`cart/${data}`,
    })
  })

})

export const {useGetCartQuery,useAddToCartMutation,useDeleteCartItemMutation,useUpdateCartItemMutation}=cartApi;