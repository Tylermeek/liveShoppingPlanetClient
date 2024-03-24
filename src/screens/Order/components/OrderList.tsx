import { Avatar, Button, Image, Text } from "@rneui/themed";
import React, { useCallback, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { isEmptyArr } from "utlis/method";
import { scaleSizeW } from "utlis/scaleSize";
import OrderItem from "./OrderItem";
import Empty from "./Empty";
import { useAppSelector } from "store/hooks";
import { useRequest } from "ahooks";
import { getOrderList } from "axios/api/order";
import { IOrder } from "types/order";
import * as Progress from "react-native-progress";
import { useFocusEffect } from "@react-navigation/native";

export default function OrderList({ tab }: any) {
  console.log("rerender");
  const { data, loading, run } = useRequest(getOrderList, {
    manual: true,
  });
  // const list: IOrder[] = [
  //   {
  //     orderStatusText: "已取消(系统)",
  //     aftersaleStatus: 0,
  //     isGroupin: false,
  //     orderSn: "20240314784711",
  //     actualPrice: 599,
  //     goodsList: [
  //       {
  //         number: 1,
  //         picUrl:
  //           "http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png",
  //         price: 599,
  //         id: 1,
  //         goodsName: "日式和风懒人沙发",
  //         specifications: ["标准"],
  //       },
  //     ],
  //     id: 1,
  //     handleOption: {
  //       cancel: false,
  //       delete: true,
  //       pay: false,
  //       comment: false,
  //       confirm: false,
  //       refund: false,
  //       rebuy: false,
  //       aftersale: false,
  //     },
  //   },
  // ];

  useFocusEffect(
    useCallback(() => {
      console.log("run", loading);
      run({ showType: tab });
    }, [])
  );

  return loading ? (
    <Progress.Circle
      size={40}
      indeterminate={true}
      color="#EC9A86"
      borderWidth={scaleSizeW(2)}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: [
          { translateX: -scaleSizeW(30) },
          { translateY: -scaleSizeW(30) },
        ],
      }}
    />
  ) : !isEmptyArr(data?.data?.list || []) ? (
    <ScrollView style={{ flex: 1 }}>
      {data?.data?.list.map((order) => (
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
  loading: {
    padding: 0,
    width: scaleSizeW(20),
    // top: "50%",
    // left: "50%",
    // position: "absolute",
    // transform: [{ translateX: -50 }, { translateY: -50 }]
  },
  loadingContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
