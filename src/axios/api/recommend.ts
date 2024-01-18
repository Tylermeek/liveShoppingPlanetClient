import { request } from "axios/config";
import { ProductInfo, LiveInfo, SwiperInfo } from "types/info";

export interface Recommendlist {
  productList: ProductInfo[];
  liveList: LiveInfo[];
}

export const getRecommendlist = () => {
  return request.get<Recommendlist>("/recommend/recommendList");
};

export type SwiperInfoList = SwiperInfo[];

export const getSiwperList = () => {
  return request.get<SwiperInfoList>("/ad/swiperList");
};
