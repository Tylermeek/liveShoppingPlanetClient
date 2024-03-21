export interface IOrderReqParam {
  /**
   * 分页大小，默认值为10
   */
  limit?: number;
  /**
   * 排序方式，默认值为desc
   */
  order?: string;
  /**
   * 分页页数，默认值为1
   */
  page?: number;
  /**
   * 显示类型，如果是0则是全部订单
   */
  showType?: OrderType;
  /**
   * 排序字段，默认值为add_time
   */
  sort?: string;
  /**
   * 用户ID
   */
  userId?: number;
}
export interface IOrderList {
  list: IOrder[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}

export interface IOrder {
  actualPrice: number;
  aftersaleStatus: number;
  goodsList: IOrderGoodInfo[];
  handleOption: IHandleOption;
  id: number;
  isGroupin: boolean;
  orderSn: string;
  orderStatusText: string;
}

export interface IOrderGoodInfo {
  goodsName: string;
  id: number;
  number: number;
  picUrl: string;
  price: number;
  specifications: string[];
}

export interface IHandleOption {
  aftersale: boolean;
  cancel: boolean;
  comment: boolean;
  confirm: boolean;
  delete: boolean;
  pay: boolean;
  rebuy: boolean;
  refund: boolean;
}

// 枚举定义
export const enum OrderType {
  All,
  Unpaid,
  Unshipped,
  Undelivered,
  Unrated,
  RefundOrAftersales,
}

export interface IOrderDetail {
  expressInfo: string[];
  orderGoods: IOrderGood[];
  orderInfo: IOrderInfo;
}

export interface IOrderGood {
  goodsId: number;
  goodsName: string;
  goodsSn: string;
  id: number;
  number: number;
  orderId: number;
  picUrl: string;
  price: number;
  productId: number;
  specifications: string[];
  addTime: string;
  comment: number;
  deleted: boolean;
  updateTime: string;
}

export interface IOrderInfo {
  actualPrice: number;
  address: string;
  addTime: string;
  aftersaleStatus: number;
  consignee: string;
  couponPrice: number;
  freightPrice: number;
  goodsPrice: number;
  handleOption: IHandleOption;
  id: number;
  message: string;
  mobile: string;
  orderSn: string;
  orderStatusText: string;
}

export interface IOrderSubmitInfo {
  cartId: number;
  addressId: number;
  couponId: number;
  message: string;
  grouponRulesId: number;
  grouponLinkId: number;
}
