import { RouteProp } from "@react-navigation/native";
import React from "react";

// 定义路由名枚举
export enum Views {
  Home = "Home",
  Live = "Live",
  SearchDetail = "SearchDetail",
  LiveRoom = "LiveRoom",
}

// 设置每个路由需要接受的参数列表
interface LiveRoomProps {
  userId: number;
  userName: string;
}

// 处理参数路由映射表
export type RootStackParamList = {
  [Views.Home]: undefined;
  [Views.Live]: undefined;
  [Views.SearchDetail]: undefined;
  [Views.LiveRoom]: LiveRoomProps;
};

// 定义每个子路由接受的具体参数类型，否则useRoute会丢失参数声明
export type RootRouteType = RouteProp<RootStackParamList>;

// 全局声明useNavigation的参数
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
