import {
  CompositeScreenProps,
  NavigationContainer,
} from "@react-navigation/native";
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import TabBar, { TabBarParamList } from "./TabBar";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import SearchDetail from "screens/SearchDetail";
import LiveRoom from "screens/LiveRoom";
import SearchResultList from "screens/SearchResultList";
import ProductDetail from "screens/ProductDetail";
import Mine from "screens/Mine";
import LogIn from "screens/LogIn";
import SignUp from "screens/SignUp";
import Playground from "screens/Playground";
import Order from "screens/Order";
import Message from "screens/Message";
import ContactSearch from "screens/ContactSearch";
import ResetPassword from "screens/ResetPassword";
import SearchOrderList from "screens/SearchOrderList";
import CatalogDetail from "screens/CatalogDetail";
import Live from "screens/Live";

export type CompositeTabScreenParamList<T extends keyof TabBarParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<TabBarParamList, T>,
    NativeStackScreenProps<RootStackParamList>
  >;

const routeConfig = [
  {
    name: "Tab",
    component: TabBar,
  },
  {
    name: "SearchDetail",
    component: SearchDetail,
  },
  {
    name: "LiveRoom",
    component: LiveRoom,
  },
  {
    name: "Live",
    component: Live,
  },
  {
    name: "SearchResultList",
    component: SearchResultList,
  },
  {
    name: "ProductDetail",
    component: ProductDetail,
  },
  {
    name: "Mine",
    component: Mine,
  },
  {
    name: "LogIn",
    component: LogIn,
  },
  {
    name: "SignUp",
    component: SignUp,
  },
  {
    name: "Order",
    component: Order,
  },
  {
    name: "Message",
    component: Message,
  },
  {
    name: "ContactSearch",
    component: ContactSearch,
  },
  {
    name: "ResetPassword",
    component: ResetPassword,
  },
  {
    name: "SearchOrderList",
    component: SearchOrderList,
  },
  {
    name: "CatalogDetail",
    component: CatalogDetail,
  },
  {
    name: "PlayGround",
    component: Playground,
  },
];

const RootNav = createNativeStackNavigator();

type StackPropsHandler<T> = {
  screen: keyof T;
  params?: T[keyof T];
};

type RootStackParamList = {
  Tab: StackPropsHandler<TabBarParamList>;
};

const RootStack: React.FC<RootStackParamList> = () => {
  return (
    <>
      <NavigationContainer>
        <RootNav.Navigator screenOptions={{ headerShown: false }}>
          {routeConfig.map(({ name, component }) => {
            return (
              <RootNav.Screen
                key={name}
                name={name}
                component={component as any}
              ></RootNav.Screen>
            );
          })}
        </RootNav.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({});

export default RootStack;
