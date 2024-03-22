import { Icon, TabView, Text } from "@rneui/themed";
import GoBack from "components/GoBack";
import SearchBanner from "components/SearchBanner";
import { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import OrderTab, { orderTabList } from "./components/OrderTab";
import OrderList from "./components/OrderList";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getOrderListThunk, setCurrentTab } from "slice/order";
import React from "react";
import SearchOrderBanner from "components/SearchOrderBanner";

export default function Order() {
  const { currentTab } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const handleTabChange = (newTab: number) => {
    dispatch(setCurrentTab(newTab));
  };

  useEffect(() => {
    dispatch(getOrderListThunk());
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchOrderBanner />
      <OrderTab />
      <TabView value={currentTab} onChange={handleTabChange}>
        {/* {orderTabList.map((order) => (
          
        ))} */}
        <TabView.Item key={0} style={{ flex: 1 }}>
          <OrderList key={0} tab={0} />
        </TabView.Item>
        <TabView.Item key={1} style={{ flex: 1 }}>
          <OrderList key={1} tab={1} />
        </TabView.Item>
        <TabView.Item key={2} style={{ flex: 1 }}>
          <OrderList key={2} tab={2} />
        </TabView.Item>
      </TabView>
    </GestureHandlerRootView>
  );
}
