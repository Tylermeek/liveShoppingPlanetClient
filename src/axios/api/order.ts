import { request } from "axios/config";
import { IOrderList, IOrderReqParam } from "types/order";

export const getOrderList = (params: IOrderReqParam) =>
  request.get<IOrderList>("/order/list", { params });
