// src/redux/api/deliveryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithAuth } from "./baseQueryWithAuth";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: baseQueryWithAuth,

  tagTypes: ["orderData"],
  endpoints: (builder) => ({
    //  Place direct order
    placeOrderDirectly: builder.mutation({
      query: (orderData) => ({
        url: `order/place-directly`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orderData"],
    }),

    placeCartOrder: builder.mutation({
      query: (userId) => ({
        url: "order/place-cart-order",
        method: "POST",
         params: { userId }
    
      }),
      invalidatesTags: ["orderData"],
    }),

    // Get Order Info
    getOrderInfo: builder.query({
      query: (userId) => `order/${userId}`,
      providesTags: ["orderData"],
    }),

    //  Update Order Info
    updateOrderStatus: builder.mutation({
      query: ({ orderId, orderStatus }) => ({
        url: `order/${orderId}?orderStatus=${orderStatus}`,
        method: "PUT",

      }),
      invalidatesTags: ["orderData"],
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ orderId, paymentType, paymentStatus }) => ({
        url: `order/payment/${orderId}`,
        method: "PUT",
        params: { paymentType, paymentStatus }
      }),
      invalidatesTags: ["orderData"],
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
  useUpdateOrderStatusMutation,
  useUpdatePaymentStatusMutation,
  usePlaceCartOrderMutation,

} = orderApi;
