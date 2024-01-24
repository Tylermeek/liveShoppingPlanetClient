import { request } from "axios/config";
import { CommentInfo, ProductInfo } from "types/info";

export const getProductInfo = (productId: number) => {
  return request.get<ProductInfo>("/product/info", { params: { productId } });
};

export type CoverList = string[];
export const getProductCoverList = (productId: number) => {
  return request.get<CoverList>("/product/coverList", {
    params: { productId },
  });
};
export type DetailList = string[];

export const getProductDetailList = (productId: number) => {
  return request.get<DetailList>("/product/detail", {
    params: { productId },
  });
};

export enum FliterType {
  Default = "default",
  WithImg = "withImg",
}

export const getProductCommentList = (
  productId: number,
) => {
  return request.get<CommentInfo[]>("/product/comment", {
    params: { productId },
  });
};
