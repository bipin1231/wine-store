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
    //  Place direct order
    placeOrderDirectly: builder.mutation({
      query: (orderData) => ({
        url: `/place-directly`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orderData"],
    }),

    placeCartOrder: builder.mutation({
      query: (userId) => ({
        url: "/place-cart-order",
        method: "POST",
         params: { userId }
    
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
      query: ({ orderId, orderStatus }) => ({
        url: `/${orderId}?orderStatus=${orderStatus}`,
        method: "PUT",

      }),
      invalidatesTags: ["orderData"],
    }),

    updatePaymentStatus: builder.mutation({
      query: ({ orderId, paymentType, paymentStatus }) => ({
        url: `/payment/${orderId}`,
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
