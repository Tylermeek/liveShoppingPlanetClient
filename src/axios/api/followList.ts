import {request} from "axios/config";

export interface followingInfo {
  id: number;
  name: string;
  avatar: string;
}

export type followingList = followingInfo[];

export const getLivingfollowingList = () => {
  return request.get<followingList>("/followingList/living");
};
