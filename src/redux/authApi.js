import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const authApi=createApi({
  reducerPath:"authApi",
  baseQuery:fetchBaseQuery({baseUrl:'http://localhost:8080/user'}),

    prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },

  endpoints:builder=>({
    signup:builder.mutation({
      query: data=>({
        url:"/signup",
        method:'POST',
        body:data,
      })
    }),
    login:builder.mutation({
      query: (data)=>({
        url:"/login",
        method:'POST',
        body:data,
      })
    }),
    otpVerification:builder.mutation({
      query: ({email,otp})=>({
        url:'/verify-otp',
        method:'POST',
          body:{email,otp},
      })
    }),
    getCategory:builder.query({
      query:()=>'category',
    })
  })

})

export const {useSignupMutation,useOtpVerificationMutation,useLoginMutation }=authApi;