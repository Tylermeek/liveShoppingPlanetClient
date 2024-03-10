import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentTab: 0, // 初始的订单状态
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
  },
});

export const { setCurrentTab } = orderSlice.actions;
export default orderSlice.reducer;
