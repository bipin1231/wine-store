import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi=createApi({
  reducerPath:"authApi",
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8080/user'}),

  endpoints:builder=>({
    signup:builder.mutation({
      query: data=>({
        url:"/signup",
        method:'POST',
        body:data,
      })
    }),
    otpVerification:builder.mutation({
      query: ({email,otp})=>({
        url:`/verify-otp?email=${email}&otp=${otp}`,
        method:'POST',
       
      })
    }),
    getCategory:builder.query({
      query:()=>'category',
    })
  })

})

export const {useSignupMutation,useOtpVerificationMutation}=authApi;