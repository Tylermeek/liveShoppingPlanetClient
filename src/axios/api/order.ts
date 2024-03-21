import { request } from "axios/config";
import { IOrderList, IOrderReqParam, IOrderSubmitInfo } from "types/order";

export const getOrderList = (params: IOrderReqParam) =>
  request.get<IOrderList>("/order/list", { params });

export const getOrderDetail = (orderId: number) =>
  request.get("/order/detail", { params: { orderId } });

export const submitOrder = (data: IOrderSubmitInfo) =>
  request.post("/order/submit", data);

export const cancelOrder = (orderId: number) =>
  request.post("/order/cancel", { orderId });

export const prepayOrder = (orderId: number) =>
  request.post("/order/prepay", { orderId });

export const delOrder = (orderId: number) =>
  request.post("/order/delete", { orderId });
