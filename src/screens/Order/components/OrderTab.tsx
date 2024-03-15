import { Tab } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import { setCurrentTab } from "slice/order";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { scaleSizeW } from "utlis/scaleSize";

export const orderTabList = [
  {
    title: "全部",
    tabIndex: 0,
  },
  {
    title: "待付款",
    tabIndex: 1,
  },
  {
    title: "待发货",
    tabIndex: 2,
  },
  {
    title: "待收货",
    tabIndex: 3,
  },
  {
    title: "待评价",
    tabIndex: 4,
  },
  {
    title: "退款/售后",
    tabIndex: 5,
  },
];

export default function OrderTab() {
  const { currentTab } = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const handleTabChange = (newTab: number) => {
    dispatch(setCurrentTab(newTab));
  };

  return (
    <View style={{ margin: scaleSizeW(10), marginBottom: 0 }}>
      <Tab
        value={currentTab}
        onChange={handleTabChange}
        dense
        scrollable
        disableIndicator
        titleStyle={(active) => ({
          color: active ? "#E36235" : "grey",
        })}
      >
        {orderTabList.map((tab) => (
          <Tab.Item key={tab.tabIndex}>{tab.title}</Tab.Item>
        ))}
      </Tab>
    </View>
  );
}
