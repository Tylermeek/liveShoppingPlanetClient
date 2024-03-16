import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPro,
  checkPros,
  delPros,
  getCartList,
  updateProNum,
} from "axios/api/cart";
import {
  CartState,
  CartStatus,
  IAddProData,
  ICheckProsData,
  IDelProsData,
  IUpdateProData,
} from "types/cart";

const initialState: CartState = {
  submitList: [],
  // todo 修改默认值
  cartStatus: CartStatus.Fetched,
  cartList: [],
  cartTotal: {
    goodsCount: 0,
    checkedGoodsCount: 0,
    checkedGoodsAmount: 0,
    goodsAmount: 0,
  },
  preCartStatus: CartStatus.Fetched,
};

export const getCartlistThunk = createAsyncThunk(
  "cartInfo/getCartlistThunk",
  async () => {
    const res = await getCartList();
    console.log(res);

    return res.data;
  }
);

export const updateProNumThunk = createAsyncThunk(
  "cartInfo/updateProNumThunk",
  async (data: IUpdateProData) => {
    try {
      const res = await updateProNum(data);
      console.log(res);
      //   return res.data
    } catch (error) {
      console.warn(error);
    }
  }
);

export const checkProsThunk = createAsyncThunk(
  "cartInfo/checkPros",
  async (data: ICheckProsData) => {
    const res = await checkPros(data);
    console.log(res);

    return res.data;
  }
);

export const delProsThunk = createAsyncThunk(
  "cartInfo/delProsThunk",
  async (data: IDelProsData) => {
    delPros(data);
  }
);

export const addProThunk = createAsyncThunk(
  "cartInfo/addProThunk",
  async (data: IAddProData) => {
    const res = await addPro(data);
    console.log(res);
  }
);

const cartInfoSlice = createSlice({
  name: "cartInfo",
  initialState,
  reducers: {
    changeCartStatus: (state, { payload }: PayloadAction<CartStatus>) => {
      state.cartStatus = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCartlistThunk.pending, (state) => {
        console.log("获取中");
        state.preCartStatus = state.cartStatus;
        state.cartStatus = CartStatus.Loading;
      })
      .addCase(getCartlistThunk.fulfilled, (state, { payload }) => {
        state.cartStatus = CartStatus.Fetched;
        state.cartList = payload.cartList;
        state.cartTotal = payload.cartTotal;
        state.submitList = payload.cartList
          .filter((pro) => pro.checked)
          .map((pro) => pro.id);
      })
      .addCase(getCartlistThunk.rejected, (state) => {
        console.log("失败");
        state.cartStatus = CartStatus.Fetched;
      })
      .addCase(updateProNumThunk.pending, (state) => {
        console.log("更新num中");
        state.preCartStatus = state.cartStatus;
        state.cartStatus = CartStatus.Loading;
      })
      .addCase(updateProNumThunk.fulfilled, (state, { payload }) => {
        state.cartStatus = state.preCartStatus;
      })
      .addCase(updateProNumThunk.rejected, (state) => {
        console.log("更新num失败");
        state.cartStatus = CartStatus.Fetched;
      })
      .addCase(checkProsThunk.pending, (state) => {
        console.log("更新勾选状态中", state.cartStatus);
        state.preCartStatus = state.cartStatus;
        state.cartStatus = CartStatus.Loading;
      })
      .addCase(checkProsThunk.fulfilled, (state, { payload }) => {
        state.cartStatus = state.preCartStatus;
        state.cartList = payload.cartList;
        state.cartTotal = payload.cartTotal;
        state.submitList = payload.cartList
          .filter((pro) => pro.checked)
          .map((pro) => pro.id);
      })
      .addCase(checkProsThunk.rejected, (state) => {
        console.log("更新勾选状态失败");
      })
      .addCase(delProsThunk.pending, (state, { payload }) => {
        console.log("删除商品中");
        state.preCartStatus = state.cartStatus;
        state.cartStatus = CartStatus.Loading;
      })
      .addCase(delProsThunk.fulfilled, (state) => {
        state.cartStatus = state.preCartStatus;
        console.log("删除成功");
      })
      .addCase(delProsThunk.rejected, (state) => {
        console.log("删除商品失败");
      })
      .addCase(addProThunk.pending, (state, { payload }) => {
        console.log("添加商品中");
      })
      .addCase(addProThunk.fulfilled, (state) => {
        console.log("添加成功");
      })
      .addCase(addProThunk.rejected, (state) => {
        console.log("添加商品失败");
      });
  },
});

export const { changeCartStatus } = cartInfoSlice.actions;

export default cartInfoSlice.reducer;
