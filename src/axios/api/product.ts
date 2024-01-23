import { request } from "axios/config";
import { ProductInfo } from "types/info";

export const getProductInfo = (productId: number) => {
  return request.get<ProductInfo>("/product/info", { params: { productId } });
};

export type CoverList =  string[]
export const getProductCoverList = (productId: number) => {
    return request.get<CoverList>("/product/coverList", { params: { productId } });
  };
  