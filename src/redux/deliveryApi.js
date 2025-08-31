// src/redux/api/deliveryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const deliveryApi = createApi({
  reducerPath: "deliveryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080/api" }), // adjust if needed
  tagTypes: ["DeliveryInfo"],
  endpoints: (builder) => ({
    // ✅ Add Delivery Info
    addDeliveryInfo: builder.mutation({
      query: ({ userId, deliveryData }) => ({
        url: `/delivery/${userId}`,
        method: "POST",
        body: deliveryData,
      }),
      invalidatesTags: ["DeliveryInfo"],
    }),

    // ✅ Get Delivery Info
    getDeliveryInfo: builder.query({
      query: (userId) => `/delivery/${userId}`,
      providesTags: ["DeliveryInfo"],
    }),

    // ✅ Update Delivery Info
    updateDeliveryInfo: builder.mutation({
      query: ({ userId, deliveryData }) => ({
        url: `/delivery/${userId}`,
        method: "PUT",
        body: deliveryData,
      }),
      invalidatesTags: ["DeliveryInfo"],
    }),

    // ✅ Delete Delivery Info
    deleteDeliveryInfo: builder.mutation({
      query: (userId) => ({
        url: `/delivery/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeliveryInfo"],
    }),
  }),
});

// Auto-generated React hooks
export const {
  useAddDeliveryInfoMutation,
  useGetDeliveryInfoQuery,
  useUpdateDeliveryInfoMutation,
  useDeleteDeliveryInfoMutation,
} = deliveryApi;
