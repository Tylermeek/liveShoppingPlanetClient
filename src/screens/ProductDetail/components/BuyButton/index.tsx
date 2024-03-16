import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Button } from "@rneui/themed";
import { scaleSizeW } from "utlis/scaleSize";

export default function BuyButton({
  goodsId,
  num,
}: {
  goodsId: number;
  num: number;
}) {
  const handleBuyNow = () => {
    // todo 立即购买功能
    console.log("立即购买", goodsId, num);
  };
  return (
    <View style={styles.buttonWrap}>
      <Button
        color="#E36255"
        title={"立即购买"}
        radius={0}
        buttonStyle={styles.buttonRStyle}
        containerStyle={{ borderRadius: scaleSizeW(25) }}
        titleStyle={{ fontSize: scaleSizeW(13) }}
        onPress={handleBuyNow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    flex: 1,
    justifyContent: "center",
    marginTop: scaleSizeW(10),
  },
  buttonRStyle: {
    borderRadius: scaleSizeW(25),
  },
});
