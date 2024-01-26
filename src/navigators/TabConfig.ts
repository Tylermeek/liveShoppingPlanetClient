import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import Cart from "screens/Cart";
import Home from "screens/Home";
import Live from "screens/Live";

// TODO Tab栏完善
export const tabConfig = [
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
];

export enum TabIconName {
  Home = "home",
  Live = "cast",
  Cart = "shopping-cart"
}
