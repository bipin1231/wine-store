import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});
