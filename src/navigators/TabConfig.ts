import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Cart from "screens/Cart";
import Home from "screens/Home";
import Live from "screens/Live";
import LogIn from "screens/LogIn";
import Mine from "screens/Mine";
import Playground from "screens/Playground";

// TODO Tab栏完善
export const tabConfig = [
  {
    name: "Playground",
    component: LogIn,
    options: {
      title: "Playground",
    },
  },
  {
    name: "Home",
    component: Home,
    options: {
      title: "首页",
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
  LogIn = "home"
}
