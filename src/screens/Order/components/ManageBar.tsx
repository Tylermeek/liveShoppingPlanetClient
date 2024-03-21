import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { IHandleOption } from "types/order";
import { Button } from "@rneui/themed";
import { useRequest } from "ahooks";
import { delOrder } from "axios/api/order";
import { scaleSizeW } from "utlis/scaleSize";

const ButtonFactory = ({ type, orderId }: any) => {
  const [loading, setLoading] = useState(false);
  let title = "";
  let handlePress = () => console.log(type, orderId);

  switch (type) {
    case "cancel":
      title = "取消订单";
      break;
    case "delete":
      title = "删除订单";
      handlePress = () => {
        setLoading(true);
        delOrder(orderId)
          .then(() => {
            console.log("deled");
          })
          .finally(() => {
            setLoading(false);
          });
      };
      break;
    case "pay":
      title = "支付订单";
      break;
    case "comment":
      title = "评论订单";
      break;
    case "confirm":
      title = "确认订单";
      break;
    case "refund":
      title = "申请退款";
      break;
    case "rebuy":
      title = "重新购买";
      break;
    case "aftersale":
      title = "售后服务";
      break;
    default:
      title = "Unknown";
  }

  return (
    <Button
      radius="lg"
      size="sm"
      loading={loading}
      title={title}
      type="outline"
      titleStyle={{
        fontSize: scaleSizeW(11),
        color: type === "confirm" ? "#EC9A86" : "grey",
      }}
      buttonStyle={{
        borderColor: type === "confirm" ? "#EC9A86" : "grey",
      }}
      onPress={handlePress}
    />
  );
};

export default function ManageBar({
  handleOption,
  orderId,
}: {
  handleOption: IHandleOption;
  orderId: number;
}) {
  const handleButtonClick = (action: keyof IHandleOption) => {
    console.log(action);
    // 在这里执行对应的操作
    switch (action) {
      case "delete":
        break;

      default:
        break;
    }
  };
  return (
    <View style={[styles.flexRowBox, { justifyContent: "flex-end" }]}>
      {Object.entries(handleOption).map(
        ([key, value]) =>
          value && (
            <ButtonFactory
              key={key}
              type={key}
              orderId={orderId} // 你的订单ID变量
              onPress={handleButtonClick}
            />
          )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flexRowBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: scaleSizeW(10),
  },
});
