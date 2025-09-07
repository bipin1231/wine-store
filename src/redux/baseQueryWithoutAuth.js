import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuth = fetchBaseQuery({
    baseUrl: 'https://wine-store-alg7.onrender.com/',
});
