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
  actualPrice?: number;
  aftersaleStatus?: number;
  goodsList?: IOrderGoodInfo[];
  handleOption?: IHandleOption;
  id?: number;
  isGroupin?: boolean;
  orderSn?: string;
  OrderTypeText?: string;
}

export interface IOrderGoodInfo {
  goodsName?: string;
  id?: number;
  number?: number;
  picUrl?: string;
  price?: number;
  specifications?: string[];
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
