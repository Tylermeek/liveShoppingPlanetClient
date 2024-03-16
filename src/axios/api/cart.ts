import { request } from "axios/config";
import {
  CartState,
  IAddProData,
  ICheckProsData,
  IDelProsData,
  IUpdateProData,
} from "types/cart";

export const getCartList = () => {
  return request.get<CartState>("/cart/index");
};

export const addPro = (data: IAddProData) =>
  request.post<number>("/cart/add", data);

export const updateProNum = (data: IUpdateProData) =>
  request.post("/cart/update", data);

export const checkPros = (data: ICheckProsData) =>
  request.post<CartState>("/cart/checked", data);

export const delPros = (date: IDelProsData) =>
  request.post("/cart/delete", date);
