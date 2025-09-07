

import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const paymentApi=createApi({
  reducerPath:"paymentApi",
  baseQuery:baseQueryWithAuth,
  tagTypes: ["payment"],
  endpoints:builder=>({
    initEsewa:builder.mutation({
         query: ({ orderId, amount }) => ({
        url: "api/payment/init",
        method: "POST",
        params: { orderId, amount }
      }),
            invalidatesTags: [] 
     
  })

})

});

export const { useInitEsewaMutation } = paymentApi;
