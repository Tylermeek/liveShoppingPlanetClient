import { request } from "axios/config";
import { ProductInfo, LiveInfo } from "types/info";


export interface Recommendlist {
    productList:ProductInfo[],
    liveList:LiveInfo[]
}

export const getRecommendlist = () => {
    return request.get<Recommendlist>("/recommend/recommendList")
}