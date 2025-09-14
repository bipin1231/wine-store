import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuth = fetchBaseQuery({
    // baseUrl: 'https://wine-store-alg7.onrender.com/',
    baseUrl: 'http://localhost:8080/',
    credentials: 'include', // send cookies automatically
});
