import { request } from "axios/config";
import { CartState, IAddCartData, ICheckProsData, IUpdateProData } from "types/cart";

export const getCartList = () => {
  return request.get<CartState>("/cart/index");
};

export const addCart = (data: IAddCartData) =>
  request.post<number>("/cart/add", { data });

export const updateProNum = (data: IUpdateProData) => request.post("/cart/update", data);

export const checkPros = (data: ICheckProsData) => request.post<CartState>("/cart/checked", data);
