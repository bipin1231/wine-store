import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/user',
    credentials: 'include', // send cookies automatically

  }),
  tagTypes: ["User"],


  endpoints: builder => ({
    signup: builder.mutation({
      query: data => ({
        url: "/signup",
        method: 'POST',
        body: data,
      })
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: 'POST',
        body: data,
      })
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: 'POST',
      })
    }),
    otpVerification: builder.mutation({
      query: ({ email, otp }) => ({
        url: '/verify-otp',
        method: 'POST',
        body: { email, otp },
      })
    }),
    getCurrentUser: builder.query({
      query: () => "/me",
    }),



    // ---------------- UPDATE USER ----------------
    updateUser: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
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