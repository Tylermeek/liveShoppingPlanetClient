import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCartList } from "axios/api/cart"
import { assign } from "lodash-es"
import { InfoType, ProductInfo, ShopInfo } from "types/info"

export interface ShopsState {
    byId: {
        [property: string]: ShopInfo
    },
    allIds: string[]
}

export interface ProductsInfo {
    /**
     * 购买数量
     */
    buyCount: number;
    /**
     * 限购数量
     */
    buyLimit: number;
    /**
     * 商品封面
     */
    cover?: string;
    /**
     * 商品ID
     */
    id: number;
    /**
     * 商品价格
     */
    price: number;
    /**
     * 商品所属店铺信息
     */
    shopId: string;
    /**
     * 商品名称
     */
    title: string;
    /**
     * 信息类别
     */
    type: InfoType;
    [property: string]: any;
}

export interface ProductsState {
    byId: {
        [property: string]: ProductsInfo
    },
    allIds: string[]
}

export interface CartState {
    shops: ShopsState | null,
    products: ProductsState | null
}

const initialState: CartState = {
    shops: null,
    products: null
}

export const getCartlistThunk = createAsyncThunk("cartInfo/getCartlistThunk", async () => {
    const res = (await getCartList())

    return res.data
})

const cartInfoSlice = createSlice(
    {
        name: "cartInfo",
        initialState,
        reducers: {

        },
        extraReducers(builder) {
            builder
                .addCase(getCartlistThunk.pending, () => {
                    // console.log("获取中");
                })
                .addCase(getCartlistThunk.fulfilled, (state, { payload }) => {
                    state.shops = payload.shops
                    state.products = payload.products
                })
                .addCase(getCartlistThunk.rejected, () => {
                    // console.log("失败");
                })
        },
    }
)

export const { } = cartInfoSlice.actions

export default cartInfoSlice.reducer