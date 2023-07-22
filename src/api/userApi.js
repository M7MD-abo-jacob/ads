import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
});

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (bearerToken) => ({
        url: '/api/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = userApi;
