import { createSlice } from '@reduxjs/toolkit';

const adsSlice = createSlice({
  name: 'ads',
  initialState: {},
  reducers: {
    setAds: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setAds } = adsSlice.actions;
export default adsSlice.reducer;
