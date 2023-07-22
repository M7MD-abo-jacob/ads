import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: (state) => {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
