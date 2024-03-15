import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkPros, getCartList, updateProNum } from "axios/api/cart";
import { err } from "react-native-svg";
import {
  CartProductInfo,
  CartState,
  CartStatus,
  ICheckProsData,
  IUpdateProData,
  ProductsInfo,
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

const updateTotalByChangeStatus = (pro: CartProductInfo, state: any) => {
  const proIndex = state.submitList.indexOf(pro.id);
  console.log(state.submitList, pro?.checked);

  // 首先查看是否在结算列表内
  if (proIndex !== -1 && pro?.checked) {
    state.submitList.splice(proIndex, 1);
    state.cartTotal.checkedGoodsAmount -= pro.price * pro.number;
  } else if (proIndex === -1 && !pro?.checked) {
    state.submitList.push(pro.id);
    state.cartTotal.checkedGoodsAmount += pro.price * pro.number;
  }
  // 更新勾选状态
  pro.checked = !pro.checked;
};

// const updateTotalByChangeCount = async (
//   pro: CartProductInfo,
//   state: any,
//   newCount: number
// ) => {
//   const proIndex = state.submitList.indexOf(pro.id);
//   console.log(proIndex, pro?.checked, newCount, pro.number);

//   //   // 首先查看是否在结算列表内
//   //   if (proIndex !== -1 && pro?.checked) {
//   //     state.cartStatus = CartStatus.Calculating;
//   //     state.cartTotal.checkedGoodsAmount += pro.price * (newCount - pro.number);
//   //   }
//   //   state.cartTotal.goodsAmount += pro.price * (newCount - pro.number);
//   //   // 更新购买数量
//   //   pro.number = newCount;
//   // todo 更新购物车信息，发送请求
//   try {

//     await updateProNum({
//       id: pro.id,
//       productId: pro.productId,
//       goodsId: pro.goodsId,
//       number: newCount,
//     });
//   } catch (error) {
//     console.warn(error);
//   }
//   state.cartStatus = CartStatus.Fetched;
// };

const fliterCheckedProducts = (state: any): CartProductInfo[] => {
  // 处理已有勾选状态的情况
  return state.cartList.filter((pro: CartProductInfo) => {
    return pro.checked;
  });
};

const updateCartInfo = (state: CartState, payload: CartState) => {
  state.cartList = payload.cartList;
  state.cartTotal = payload.cartTotal;
  state.submitList = payload.cartList
    .filter((pro) => pro.checked)
    .map((pro) => pro.id);
};

const cartInfoSlice = createSlice({
  name: "cartInfo",
  initialState,
  reducers: {
    changeProductBuyCount: (
      state,
      { payload }: PayloadAction<{ product: CartProductInfo; number: number }>
    ) => {
      updateProNumThunk({
        id: payload.product.id,
        productId: payload.product.productId,
        goodsId: payload.product.goodsId,
        number: payload.number,
      });
    },
    changeCartStatus: (state, { payload }: PayloadAction<CartStatus>) => {
      state.cartStatus = payload;
    },
    delProducts: (state) => {
      state.cartStatus = CartStatus.Loading;
      const checkedPros = fliterCheckedProducts(state);
      checkedPros.forEach((pro) => {
        if (state.cartList.length) {
          // 更新计算金额
          if (state.submitList.includes(pro.id)) {
            state.submitList.splice(state.submitList.indexOf(pro.id), 1);
            state.cartTotal.checkedGoodsCount -= pro.price * pro.number;
          }
          state.cartList.splice(state.cartList.indexOf(pro), 1);
          state.cartTotal.goodsCount -= pro.number;
          state.cartTotal.goodsAmount -= pro.price * pro.number;
        }
      });
      // todo 删除接口
      state.cartStatus = CartStatus.Editing;
    },
    delAllProducts: (state) => {
      state.cartStatus = CartStatus.Loading;
      // todo 删除接口,重新获取数据
      state.submitList = [];
      state.cartStatus = CartStatus.Fetched;
    },
    addCart: (state, { payload }: PayloadAction<CartProductInfo>) => {
      // 处理已经在购物车内的情况
      const pro = state.cartList.find((pro) => pro.id === payload.id);
      if (pro) {
        changeProductBuyCount({ product: pro, number: pro.number + 1 });
      } else {
        // todo 新增商品
        // addCart({productId:proId})
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getCartlistThunk.pending, (state) => {
        console.log("获取中");
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
      .addCase(getCartlistThunk.rejected, () => {
        console.log("失败");
      })
      .addCase(updateProNumThunk.pending, (state) => {
        console.log("更新num中");
        state.cartStatus = CartStatus.Loading;
      })
      .addCase(updateProNumThunk.fulfilled, (state, { payload }) => {
        state.cartStatus = CartStatus.Fetched;
      })
      .addCase(updateProNumThunk.rejected, () => {
        console.log("更新num失败");
      })
      .addCase(checkProsThunk.pending, (state) => {
        console.log("更新勾选状态中");
        state.cartStatus = CartStatus.Loading;
      })
      .addCase(checkProsThunk.fulfilled, (state, { payload }) => {
        state.cartStatus = CartStatus.Fetched;
        state.cartStatus = CartStatus.Fetched;
        state.cartList = payload.cartList;
        state.cartTotal = payload.cartTotal;
        state.submitList = payload.cartList
          .filter((pro) => pro.checked)
          .map((pro) => pro.id);
      })
      .addCase(checkProsThunk.rejected, () => {
        console.log("更新勾选状态失败");
      });
  },
});

export const {
  changeProductBuyCount,
  changeCartStatus,
  delProducts,
  delAllProducts,
} = cartInfoSlice.actions;

export default cartInfoSlice.reducer;
