import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getOrderList } from "axios/api/order";
import { cloneDeep } from "lodash-es";
import { IOrder, OrderType } from "types/order";
import { boolean } from "yup";

const initialState: {
  currentTab: OrderType;
  orderList: IOrder[];
  curList: IOrder[];
  loading: boolean;
} = {
  currentTab: 0, // 初始的订单状态
  orderList: [],
  curList: [],
  loading: false,
};

export const getOrderListThunk = createAsyncThunk(
  "order/getOrderListThunk",
  async () => {
    const res = await getOrderList({});
    if (res.errno === 0) {
      return res.data;
    }
    throw new Error("get wrong");
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    fliterOrderlist: (state, { payload }: PayloadAction<string>) => {
      state.currentTab = 0;
      const cloneList = cloneDeep(state.orderList);
      state.curList = cloneList.filter((order) =>
        order.goodsList.some((goods) => goods.goodsName.includes(payload))
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderListThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrderListThunk.fulfilled, (state, { payload }) => {
        state.orderList = payload?.list || [];
      })
      .addCase(getOrderListThunk.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setCurrentTab, fliterOrderlist } = orderSlice.actions;
export default orderSlice.reducer;
