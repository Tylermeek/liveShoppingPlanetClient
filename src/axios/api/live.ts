import { request } from "axios/config";
import { LiveSwiperInfo } from "types/info";

export const getLiveSwiperBanner = () => {
  return request.get<LiveSwiperInfo[]>("/live/banner");
};
