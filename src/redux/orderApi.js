// src/redux/api/deliveryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://localhost:8080/order",
       credentials: 'include', 
  }),


  tagTypes: ["orderData"],
  endpoints: (builder) => ({
    //  Add Delivery Info
    placeOrderDirectly: builder.mutation({
      query: ( orderData) => ({
        url: `/place-directly`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orderData"],
    }),

    // Get Order Info
    getOrderInfo: builder.query({
      query: (userId) => `/${userId}`,
      providesTags: ["orderData"],
    }),

    //  Update Order Info
    updateOrderStatus: builder.mutation({
      query: ({ userId, orderStatus }) => ({
        url: `/delivery/${userId}?orderStatus=${orderStatus}`,
        method: "PUT",
       
      }),
      invalidatesTags: ["DeliveryInfo"],
    }),

    //  Delete Delivery Info
    // deleteDeliveryInfo: builder.mutation({
    //   query: (userId) => ({
    //     url: `/delivery/${userId}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["DeliveryInfo"],
    // }),
  }),
});

// Auto-generated React hooks
export const {
usePlaceOrderDirectlyMutation,
useGetOrderInfoQuery,
useUpdateOrderStatusMutation
} = orderApi;
