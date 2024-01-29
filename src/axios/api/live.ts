import { request } from "axios/config";
import { LiveSwiperInfo } from "types/info";

export const getLiveSwiperBanner = () => {
  return request.get<LiveSwiperInfo[]>("/live/banner");
};

export function getLiveList(params: {
  orderName: string;
  orderBy: string;
  nowPage?: number;
  pageSize?: number;
}) {
  return request.get<any>('/live/list', { params });
}
