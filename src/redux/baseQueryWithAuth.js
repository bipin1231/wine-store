import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuth = fetchBaseQuery({
    // baseUrl: 'https://wine-store-alg7.onrender.com/',
    // baseUrl: 'http://localhost:8080/',
    baseUrl: 'https://springboot-production-e29d.up.railway.app/',
    credentials: 'include', // send cookies automatically
});
