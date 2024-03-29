import { request } from "axios/config";
import { ProductInfo, LiveInfo, ProductSwiperInfo } from "types/info";

export interface Recommendlist {
  productList: ProductInfo[];
  liveList: LiveInfo[];
}

export const getRecommendlist = (pageNo: number) => {
  return request.get<Recommendlist>(`/recommend/recommendList?pageNo=${pageNo}`);
};

export type SwiperInfoList = ProductSwiperInfo[];

export const getSiwperList = () => {
  return request.get<SwiperInfoList>("/recommend/swiperList");
};

export interface PromotionalActivityInfo {
  /**
   * 活动名称
   */
  activityName: string;
  /**
   * 商品列表
   */
  productList: ProductInfo[];
  [property: string]: any;
}

export const getPromotionalActivity = () => {
  return request.get<PromotionalActivityInfo>("/recommend/promotionalActivity");
};
