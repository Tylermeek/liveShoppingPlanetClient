import { Avatar, Image, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { isEmptyArr } from "utlis/method";
import { scaleSizeW } from "utlis/scaleSize";
import OrderItem from "./OrderItem";
import Empty from "./Empty";
import { useAppSelector } from "store/hooks";
import { useRequest } from "ahooks";
import { getOrderList } from "axios/api/order";
import { IOrder } from "types/order";

export default function OrderList({ tabIndex }: { tabIndex: number }) {
  const { currentTab } = useAppSelector((state) => state.order);

  const { data } = useRequest(getOrderList, {
    defaultParams: [{ showType: currentTab }],
  });

  const list: IOrder[] = [
    {
      orderStatusText: "已取消(系统)",
      aftersaleStatus: 0,
      isGroupin: false,
      orderSn: "20240314784711",
      actualPrice: 599,
      goodsList: [
        {
          number: 1,
          picUrl:
            "http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png",
          price: 599,
          id: 1,
          goodsName: "日式和风懒人沙发",
          specifications: ["标准"],
        },
      ],
      id: 1,
      handleOption: {
        cancel: false,
        delete: true,
        pay: false,
        comment: false,
        confirm: false,
        refund: false,
        rebuy: false,
        aftersale: false,
      },
    },
  ];

  return !isEmptyArr(list) ? (
    <ScrollView style={{ flex: 1 }}>
      {list.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </ScrollView>
  ) : (
    <Empty />
  );
}

const styles = StyleSheet.create({
  flexRowBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {},
});
