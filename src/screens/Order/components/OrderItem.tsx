import { Avatar, Button, Icon, Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IOrder } from "types/order";
import { scaleSizeW } from "utlis/scaleSize";
import ManageBar from "./ManageBar";

export default function OrderItem({ order }: { order: IOrder }) {
  const handleCheckDetail = () => {
    console.log("check", order.id);
  };

  return (
    <TouchableOpacity
      style={[
        styles.flexRowBox,
        { marginTop: scaleSizeW(10), justifyContent: "space-between" },
      ]}
      onPress={handleCheckDetail}
    >
      <View style={styles.container}>
        <View style={[styles.flexRowBox, { justifyContent: "space-between" }]}>
          <View style={[styles.flexRowBox]}>
            <Text style={{ marginLeft: scaleSizeW(5), fontWeight: "bold" }}>
              订单sn {order.orderSn}
            </Text>
            <Icon
              style={{ marginLeft: scaleSizeW(5) }}
              color="grey"
              size={15}
              name="arrow-forward-ios"
            />
          </View>
          <Text style={{ color: "#E36235" }}>{order.orderStatusText}</Text>
        </View>
        {order.goodsList.map((good) => (
          <>
            <View
              key={good.id}
              style={{ height: scaleSizeW(70), width: scaleSizeW(70) }}
            >
              <Image
                source={{ uri: good.picUrl }}
                style={{ height: "100%", width: "100%" }}
                borderRadius={scaleSizeW(5)}
              />
            </View>
            <View style={{ marginLeft: scaleSizeW(10), flex: 1 }}>
              <Text style={{ fontSize: scaleSizeW(16), fontWeight: "600" }}>
                {good.goodsName}
              </Text>
              <Text style={{ color: "grey", marginTop: scaleSizeW(5) }}>
                {good.specifications.map((spec) => spec + " ")}
              </Text>
            </View>
            <View style={{ marginLeft: scaleSizeW(10) }}>
              <Text style={{ fontSize: scaleSizeW(16), fontWeight: "600" }}>
                ${good.price}
              </Text>
              <Text style={{ color: "grey", marginTop: scaleSizeW(5) }}>
                x{good.number}
              </Text>
            </View>
          </>
        ))}
        <ManageBar orderId={order.id} handleOption={order.handleOption} />
        {/* <View style={[styles.flexRowBox, { justifyContent: "flex-end" }]}>
        <Button
          title="删除订单"
          type="outline"
          size="sm"
          radius="lg"
          buttonStyle={{ borderColor: "grey" }}
          titleStyle={{ fontSize: scaleSizeW(11), color: "grey" }}
          onPress={handleDelOrder}
        />
        <Button
          title="再买一单"
          type="outline"
          size="sm"
          radius="lg"
          titleStyle={{ fontSize: scaleSizeW(11) }}
          containerStyle={{ marginLeft: scaleSizeW(10) }}
          onPress={handleBuyMore}
        />
      </View> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  flexRowBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    margin: scaleSizeW(10),
    marginBottom: 0,
    borderRadius: scaleSizeW(10),
    padding: scaleSizeW(10),
  },
});
