import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { userApi } from '../api/userApi';
import userSlice from './slices/userSlice';
import { adsApi } from '../api/adsApi';
import adsSlice from './slices/adsSlice';

export const store = configureStore({
  reducer: {
    // other reducers if any
    user: userSlice,
    ads: adsSlice,
    [userApi.reducerPath]: userApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware).concat(adsApi.middleware),
});

setupListeners(store.dispatch);
