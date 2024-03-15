import { InfoType, ShopInfo } from "./info";

export interface ShopsInfo extends ShopInfo {
  /**
   * 在该店铺购买的商品id数组
   */
  buyProducts: string[];
}

export interface ShopsState {
  byId: {
    [property: string]: ShopsInfo;
  };
  allIds: string[];
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
    [property: string]: ProductsInfo;
  };
  allIds: string[];
}

export enum CartStatus {
  Loading,
  Fetched,
  Calculating,
  Editing,
}

export interface CartState {
  submitList: number[];
  cartStatus: CartStatus;
  cartList: CartProductInfo[];
  cartTotal: CartTotal;
}

export interface CartProductInfo {
  addTime: string;
  checked: boolean;
  deleted: boolean;
  goodsId: number;
  goodsName: string;
  goodsSn: string;
  id: number;
  number: number;
  picUrl: string;
  price: number;
  productId: number;
  specifications: string[];
  updateTime: string;
  userId: number;
}

export interface CartTotal {
  checkedGoodsAmount: number;
  checkedGoodsCount: number;
  goodsAmount: number;
  goodsCount: number;
}

export interface IAddCartData {
  goodsId: number;
  number: number;
  productId: number;
}

export interface IUpdateProData {
  id: number;
  goodsId: number;
  number: number;
  productId: number;
}

export interface ICheckProsData {
  productIds: number[];
  isChecked: number;
}