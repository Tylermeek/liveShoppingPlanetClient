import { Avatar, Button, Chip, Icon, Image, Text } from "@rneui/themed";
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
              订单 {order.id}
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
              style={[styles.flexRowBox, { justifyContent: "space-between" }]}
            >
              <View
                style={[styles.flexRowBox, { justifyContent: "space-between" }]}
              >
                <Image
                  source={{ uri: good.picUrl }}
                  style={{ height: scaleSizeW(100), width: scaleSizeW(100) }}
                  borderRadius={scaleSizeW(5)}
                />
                <View>
                  <Text h3 style={{ fontWeight: "600" }}>
                    {good.goodsName}
                  </Text>
                  <Text h4 style={{ color: "grey", marginTop: scaleSizeW(5) }}>
                    {good.specifications.map((spec) => spec + " ")}
                  </Text>
                </View>
              </View>
              <Text style={{ color: "grey", marginTop: scaleSizeW(5) }}>
                x{good.number}
              </Text>
            </View>
            <View style={{ marginLeft: scaleSizeW(10), flex: 1 }}></View>
            <View
              style={{ marginLeft: scaleSizeW(10), alignItems: "flex-end" }}
            >
              <Text style={{ fontSize: scaleSizeW(14), fontWeight: "600" }}>
                实付款 ￥{good.price}
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
    flex: 1,
    backgroundColor: "white",
    margin: scaleSizeW(10),
    marginBottom: 0,
    borderRadius: scaleSizeW(10),
    padding: scaleSizeW(10),
  },
});
