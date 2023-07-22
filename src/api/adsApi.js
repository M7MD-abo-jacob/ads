import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.REACT_APP_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
});

export const adsApi = createApi({
  reducerPath: 'adsApi',
  baseQuery,
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: (bearerToken) => ({
        url: '/api/manage/ads',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    }),
    getActiveAds: builder.query({
      query: (bearerToken) => ({
        url: '/api/ads',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    }),
    createAd: builder.mutation({
      query: ({ ad, bearerToken }) => ({
        url: '/api/manage/ads',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        body: ad,
      }),
      invalidates: [{ type: 'getAllAds', tags: ['ads'] }],
    }),
    updateAd: builder.mutation({
      query: ({ ad, id, bearerToken }) => ({
        url: `/api/manage/ads/${id}`,
        method: 'POST',
        body: ad,
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
      invalidates: [{ type: 'getAllAds', tags: ['ads'] }],
    }),
    deleteAd: builder.mutation({
      query: ({ id, bearerToken }) => ({
        url: `/api/manage/ads/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
        invalidates: [{ type: 'getAllAds', tags: ['ads'] }],
      }),
    }),
    getStores: builder.query({
      query: (bearerToken) => ({
        url: '/api/manage/stores',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }),
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useGetActiveAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
  useGetStoresQuery,
} = adsApi;
