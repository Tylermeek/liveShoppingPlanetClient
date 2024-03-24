import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Cart from "screens/Cart";
import Catalog from "screens/Catalog";
import Home from "screens/Home";
import Live from "screens/Live";
import LogIn from "screens/LogIn";
import Mine from "screens/Mine";
import Playground from "screens/Playground";

// TODO Tab栏完善
export const tabConfig = [
  // {
  //   name: "Playground",
  //   component: Playground,
  //   options: {
  //     title: "Playground",
  //   },
  // },
  {
    name: "Home",
    component: Home,
    options: {
      title: "首页",
    },
  },
  {
    name: "Catalog",
    component: Catalog,
    options: {
      title: "分类",
    },
  },
  {
    name: "Live",
    component: Live,
    options: {
      title: "直播",
    },
  },
  {
    name: "Cart",
    component: Cart,
    options: {
      title: "购物车",
    },
  },
  {
    name: "Mine",
    component: Mine,
    options: {
      title: "我的",
    },
  },
];

export enum TabIconName {
  Playground = "home",
  Home = "home",
  Live = "cast",
  Cart = "shopping-cart",
  Mine = "home",
  LogIn = "home",
  Catalog = "home",
}
