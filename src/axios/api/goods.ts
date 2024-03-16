import { request } from "axios/config";
import { IGoodDetail, IRelatedGoodsList } from "types/goods";
import { CommentInfo, ProductInfo } from "types/info";

export const getGoodsList = () => {
  return request.get("/goods/list", {});
};

export const getGoodsCategory = () => request.get("/goods/category");

export const getGoodsDetail = ({ id }: { id: number }) =>
  request.get<IGoodDetail>("/goods/detail", { params: { id } });

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

export const getProductCommentList = (productId: number) => {
  return request.get<CommentInfo[]>("/product/comment", {
    params: { productId },
  });
};

export const getRelateGoods = (id: number) =>
  request.get<IRelatedGoodsList>("/goods/related", { params: { id } });
