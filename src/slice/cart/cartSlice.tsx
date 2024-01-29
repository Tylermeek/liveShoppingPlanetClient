import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getCartList } from "axios/api/cart"
import { assign, cloneDeep, omit } from "lodash-es"
import { InfoType, ProductInfo, ShopInfo } from "types/info"

export interface ShopsInfo extends ShopInfo {
    /**
     * 在该店铺购买的商品id数组
     */
    buyProducts: string[];
}

export interface ShopsState {
    byId: {
        [property: string]: ShopsInfo
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
    id: string;
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
    /**
     * 勾选状态 需要剔除
     */
    checked?: boolean;
    [property: string]: any;
}

export interface ProductsState {
    byId: {
        [property: string]: ProductsInfo
    },
    allIds: string[]
}

export enum CartStatus {
    Loading,
    Fetched,
    Calculating,
    Editing
}

export interface CartState {
    shops: ShopsState | null,
    products: ProductsState | null,
    totalMoney: number,
    submitList: string[],
    cartStatus: CartStatus
}

const initialState: CartState = {
    "shops": {
        "byId": {
            "1": {
                "id": "1",
                "name": "七十建商没",
                "avatar": "https://source.unsplash.com/random?sig=13",
                "follower": 1827222,
                "productNum": 411,
                "rate": {
                    "logisticsServices": 5.81,
                    "sellerService": 4.61,
                    "productDescription": 4.26
                },
                "buyProducts": [
                    "2",
                    "1"
                ]
            },
            "2": {
                "id": "2",
                "name": "商店2",
                "avatar": "https://source.unsplash.com/random?sig=14",
                "follower": 1000000,
                "productNum": 200,
                "rate": {
                    "logisticsServices": 4.5,
                    "sellerService": 4.8,
                    "productDescription": 4.3
                },
                "buyProducts": [
                    "3",
                    "4"
                ]
            }
        },
        "allIds": [
            "1",
            "2"
        ]
    },
    "products": {
        "byId": {
            "1": {
                "type": InfoType.ProductInfo,
                "id": "1",
                "title": "土提复叫程=土提复叫程=土提复叫程=土提复叫程",
                "cover": "https://source.unsplash.com/random?sig=15",
                "price": 9160,
                "sold": 3108,
                "shopId": "1",
                "buyLimit": 78,
                "buyCount": 9,
                checked: false
            },
            "2": {
                "type": InfoType.ProductInfo,
                "id": "2",
                "title": "设何电/设何电^设何电/设何电",
                "cover": "https://source.unsplash.com/random?sig=16",
                "price": 89329,
                "sold": 2000,
                "shopId": "1",
                "buyLimit": 47,
                "buyCount": 2,
                checked: false

            },
            "3": {
                "type": InfoType.ProductInfo,
                "id": "3",
                "title": "产品3",
                "cover": "https://source.unsplash.com/random?sig=17",
                "price": 5000,
                "sold": 100,
                "shopId": "2",
                "buyLimit": 20,
                "buyCount": 5,
                checked: false

            },
            "4": {
                "type": InfoType.ProductInfo,
                "id": "4",
                "title": "产品4",
                "cover": "https://source.unsplash.com/random?sig=18",
                "price": 8000,
                "sold": 500,
                "shopId": "2",
                "buyLimit": 30,
                "buyCount": 10,
                checked: false

            }
        },
        "allIds": [
            "1",
            "2",
            "3",
            "4"
        ]
    },
    totalMoney: 0,
    submitList: [],
    // todo 修改默认值
    cartStatus: CartStatus.Fetched
}

export const getCartlistThunk = createAsyncThunk("cartInfo/getCartlistThunk", async () => {
    const res = (await getCartList())

    return res.data
})

const updateTotalByChangeStatus = (pro: ProductsInfo, state: any) => {
    const proIndex = state.submitList.indexOf(pro.id)
    console.log(state.submitList, pro?.checked);

    // 首先查看是否在结算列表内
    if (proIndex !== -1 && pro?.checked) {
        state.submitList.splice(proIndex, 1)
        state.totalMoney -= (pro.price * pro.buyCount)
    }
    else if (proIndex === -1 && !pro?.checked) {
        state.submitList.push(pro.id)
        state.totalMoney += (pro.price * pro.buyCount)
    }
    // 更新勾选状态
    pro.checked = !pro.checked
}

const updateTotalByChangeCount = (pro: ProductsInfo, state: any, newCount: number) => {
    const proIndex = state.submitList.indexOf(pro.id)
    console.log(state.submitList, pro?.checked);

    // 首先查看是否在结算列表内
    if (proIndex !== -1 && pro?.checked) {
        state.cartStatus = CartStatus.Calculating
        state.totalMoney += (pro.price * (newCount - pro.buyCount))
        state.cartStatus = CartStatus.Fetched
    }
    // 更新购买数量
    pro.buyCount = newCount
    // todo 更新购物车信息，发送请求
}

const fliterCheckedProducts = (state: any): string[] => {
    const productIds = state.products?.allIds || []
    // 处理已有勾选状态的情况
    return productIds.filter((proId: string) => {
        return state.products?.byId[proId].checked
    })
}

const cartInfoSlice = createSlice(
    {
        name: "cartInfo",
        initialState,
        reducers: {
            changeProductStatus: (state, { payload }: PayloadAction<ProductsInfo>) => {
                const curPro = state.products?.byId[payload.id]
                console.log(state.cartStatus);

                if (state.cartStatus === CartStatus.Fetched) {
                    state.cartStatus = CartStatus.Calculating
                    if (curPro) {
                        updateTotalByChangeStatus(curPro, state)
                    }
                    state.cartStatus = CartStatus.Fetched
                }
                if (state.cartStatus === CartStatus.Editing && curPro) {
                    // 更新勾选状态
                    curPro.checked = !curPro.checked
                }
            },
            changeShopStatus: (state, { payload }: PayloadAction<ShopsInfo>) => {
                const curShop = state.shops?.byId[payload.id]
                // 处理已有勾选状态的情况
                const curCheckedPros = curShop?.buyProducts.filter(proId => {
                    return state.products?.byId[proId].checked
                })
                if (state.cartStatus === CartStatus.Fetched) {
                    state.cartStatus = CartStatus.Calculating
                    if (curCheckedPros?.length === curShop?.buyProducts.length) {
                        curShop?.buyProducts.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro) {
                                updateTotalByChangeStatus(curPro, state)
                            }
                        })
                    } else {
                        curShop?.buyProducts.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro && !curPro.checked) {
                                updateTotalByChangeStatus(curPro, state)
                            }
                        })
                    }
                    state.cartStatus = CartStatus.Fetched
                }
                if (state.cartStatus === CartStatus.Editing) {
                    if (curCheckedPros?.length === curShop?.buyProducts.length) {
                        curShop?.buyProducts.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro) {
                                // 更新勾选状态
                                curPro.checked = !curPro.checked
                            }
                        })
                    } else {
                        curShop?.buyProducts.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro && !curPro.checked) {
                                // 更新勾选状态
                                curPro.checked = !curPro.checked
                            }
                        })
                    }
                }

            },
            changeCheckAllStatus: (state) => {
                const productIds = state.products?.allIds || []
                // 处理已有勾选状态的情况
                const curCheckedPros = fliterCheckedProducts(state)
                if (state.cartStatus === CartStatus.Fetched) {
                    state.cartStatus = CartStatus.Calculating
                    if (curCheckedPros?.length === productIds.length) {
                        productIds.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro) {
                                updateTotalByChangeStatus(curPro, state)
                            }
                        })
                    } else {
                        productIds.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro && !curPro.checked) {
                                updateTotalByChangeStatus(curPro, state)
                            }
                        })
                    }
                    state.cartStatus = CartStatus.Fetched
                }
                if (state.cartStatus === CartStatus.Editing) {
                    if (curCheckedPros?.length === productIds.length) {
                        productIds.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro) {
                                // 更新勾选状态
                                curPro.checked = !curPro.checked
                            }
                        })
                    } else {
                        productIds.map(proID => {
                            const curPro = state.products?.byId[proID]
                            if (curPro && !curPro.checked) {
                                // 更新勾选状态
                                curPro.checked = !curPro.checked
                            }
                        })
                    }
                }
            },
            changeProductBuyCount: (state, { payload }: PayloadAction<{ number: number, productID: string }>) => {
                const curPro = state.products?.byId[payload.productID]
                if (curPro) {
                    updateTotalByChangeCount(curPro, state, payload.number)
                }
            },
            changeCartStatus: (state, { payload }: PayloadAction<CartStatus>) => {
                state.cartStatus = payload
            },
            delProducts: (state) => {
                state.cartStatus = CartStatus.Loading
                const checkedPros = fliterCheckedProducts(state)
                checkedPros.map(proId => {
                    if (state.products) {
                        const shopId = state.products.byId[proId].shopId
                        const shopPros = state.shops?.byId[shopId].buyProducts || []
                        // 更新计算金额
                        if (state.submitList.includes(proId)) {
                            state.submitList.splice(state.submitList.indexOf(proId), 1)
                            state.totalMoney -= (state.products.byId[proId].price * state.products.byId[proId].buyCount)
                        }
                        shopPros.splice(shopPros.indexOf(proId), 1)
                        state.products.allIds.splice(state.products.allIds.indexOf(proId), 1)
                        state.products && (state.products.byId = omit(state.products.byId, [proId]))
                        // 处理已经删光了店铺的商品,需要删掉商店
                        if (shopPros.length === 0) {
                            state.shops?.allIds.splice(state.shops.allIds.indexOf(shopId), 1)
                            state.shops && (state.shops.byId = omit(state.shops.byId, [shopId]))
                        }
                    }
                })
                state.cartStatus = CartStatus.Editing
            },
            delAllProducts: (state) => {
                state.cartStatus = CartStatus.Loading
                if (state.products) {
                    state.products.allIds = []
                    state.products.byId = {}
                }
                if (state.shops) {
                    state.shops.allIds = []
                    state.shops.byId = {}
                }
                state.totalMoney = 0
                state.submitList = []
                state.cartStatus = CartStatus.Fetched
            },
            addCart: (state, { payload }: PayloadAction<ProductsInfo>) => {
                // 处理已经在购物车内的情况
                const proId = payload.id
                if(state.products?.allIds.includes(proId)){
                    state.products.byId[proId].buyCount += 1
                }else{
                    // todo 新增商品
                }
            }
        },
        extraReducers(builder) {
            builder
                .addCase(getCartlistThunk.pending, (state) => {
                    console.log("获取中");
                    state.cartStatus = CartStatus.Loading
                })
                .addCase(getCartlistThunk.fulfilled, (state, { payload }) => {
                    state.shops = payload.shops
                    payload.products && payload.products.allIds.map(proId => {
                        payload.products && (payload.products.byId[proId].checked = false)
                    })
                    state.products = payload.products
                    state.cartStatus = CartStatus.Fetched
                })
                .addCase(getCartlistThunk.rejected, () => {
                    // console.log("失败");
                })
        },
    }
)

export const { changeProductStatus, changeShopStatus, changeCheckAllStatus, changeProductBuyCount, changeCartStatus, delProducts, delAllProducts } = cartInfoSlice.actions

export default cartInfoSlice.reducer