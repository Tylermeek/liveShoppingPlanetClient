import { request } from "axios/config";
import { CartState } from "slice/cart/cartSlice";

export const getCartList = () => {
  return request.get<CartState>("/cart/list");
};
