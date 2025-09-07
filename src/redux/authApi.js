import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: ["User"],


  endpoints: builder => ({
    signup: builder.mutation({
      query: data => ({
        url: "user/signup",
        method: 'POST',
        body: data,
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "user/login",
        method: 'POST',
        body: data,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: "user/logout",
        method: 'POST',
      })
    }),
    otpVerification: builder.mutation({
      query: ({ email, otp }) => ({
        url: 'user/verify-otp',
        method: 'POST',
        body: { email, otp },
      })
    }),
    getCurrentUser: builder.query({
      query: () => "user/me",
    }),



    // ---------------- UPDATE USER ----------------
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `user/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

  })

})

export const { useSignupMutation, useOtpVerificationMutation, useLoginMutation, useGetCurrentUserQuery, useLogoutMutation,
  useUpdateUserMutation
} = authApi;