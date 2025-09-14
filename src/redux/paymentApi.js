

import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const paymentApi=createApi({
  reducerPath:"paymentApi",
  baseQuery:baseQueryWithAuth,
  tagTypes: ["payment"],
  endpoints:builder=>({
    initEsewa:builder.mutation({
         query: ({ orderNumber, amount }) => ({
        url: "api/payment/init",
        method: "POST",
        params: { orderNumber, amount }
      }),
            invalidatesTags: [] 
     
  })

})

});

export const { useInitEsewaMutation } = paymentApi;
