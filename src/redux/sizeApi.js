import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithAuth } from './baseQueryWithAuth';
export const sizeApi = createApi({
  reducerPath: "sizeApi",
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    getSize: builder.query({
      query: () => 'size',
    }),
    addSize:builder.mutation({
    query: newSize=>({
      url:'/size',
      method:'POST',
      body:newSize,
    })
  }),
     updateSize:builder.mutation({
    query: newSize=>({
      url:'/size',
      method:'PUT',
      body:newSize,
    })
  }),
    
  })

})

export const { useGetSizeQuery,
  useAddSizeMutation,
  useUpdateSizeMutation

} = sizeApi;