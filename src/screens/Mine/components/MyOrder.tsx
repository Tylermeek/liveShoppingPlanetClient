import { Icon } from "@rneui/base";
import { Badge, Button, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";
import Title from "./Title";
import RecentOrder from "./RecentOrder";
import { OrderType } from "types/order";
import { useNavigation } from "@react-navigation/native";
import { Views } from "types/navigation";
import { useAppDispatch } from "store/hooks";
import { setCurrentTab } from "slice/order";

export default function MyOrder() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const orderTypeList = [
    {
      title: "待付款",
      icon: "settings",
      type: OrderType.Unpaid,
    },
    {
      title: "待发货",
      icon: "settings",
      type: OrderType.Unshipped,
    },
    {
      title: "待收货",
      icon: "settings",
      type: OrderType.Undelivered,
    },
    {
      title: "待评价",
      icon: "settings",
      type: OrderType.Unrated,
    },
    {
      title: "退款/售后",
      icon: "settings",
      type: OrderType.RefundOrAftersales,
    },
  ];

  function handlePress(type: OrderType): void {
    console.log(type);
    dispatch(setCurrentTab(type));
    navigation.navigate(Views.Order);
  }

  return (
    <View style={styles.container}>
      <Title title="我的订单" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        {orderTypeList.map(({ title, icon, type }) => (
          <View key={title} style={{ marginVertical: scaleSizeW(5) }}>
            <Button
              title={title}
              icon={<Icon name={icon} color="grey" size={27} />}
              iconPosition="top"
              type="clear"
              titleStyle={{
                fontSize: scaleSizeW(12),
                color: "grey",
              }}
              onPress={() => handlePress(type)}
            />
            {/* 目前接口无法实现数量统计 */}
            {/* <Badge
              status="primary"
              value={9}
              containerStyle={{ position: "absolute", top: 5, right: 10 }}
            /> */}
          </View>
        ))}
      </View>
      <RecentOrder />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: scaleSizeW(15),
    backgroundColor: "white",
    marginHorizontal: scaleSizeW(10),
    paddingVertical: scaleSizeW(10),
    paddingHorizontal: scaleSizeW(10),
    marginTop: scaleSizeW(10),
  },
});
