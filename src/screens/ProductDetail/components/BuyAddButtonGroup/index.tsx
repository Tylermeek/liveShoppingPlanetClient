import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { addProThunk } from "slice/cart/cartSlice";
import { useAppDispatch } from "store/hooks";
import { scaleSizeW } from "utlis/scaleSize";
import { useRequest } from "ahooks";
import { getGoodsDetail } from "axios/api/goods";
import { Button } from "@rneui/base";

export default function BuyAddButtonGroup({
  goodsId,
  num = 1,
  containerStyle = { width: scaleSizeW(180) },
  onAddSuccess,
}: {
  num?: number;
  goodsId: number;
  containerStyle: {};
  onAddSuccess: Function;
}) {
  const dispatch = useAppDispatch();
  const [productId, setProductId] = useState<number>();
  useRequest(() => getGoodsDetail({ id: goodsId }), {
    onSuccess: (res) => {
      setProductId(res.data.productList[0].id || 0);
    },
  });
  const handleAddCart = () => {
    if (productId) {
      console.log("加入购物车", goodsId, productId);
      dispatch(addProThunk({ productId, goodsId, number: num })).then(() =>
        onAddSuccess()
      );
    }
  };

  const handleBuyNow = () => {
    // todo 立即购买功能
    console.log("立即购买");
  };
  return (
    <View
      style={{
        ...styles.buttonContaniner,
        ...containerStyle,
      }}
    >
      <>
        <View style={styles.buttonWrap}>
          <Button
            color="#EC9A86"
            title={"加入购物车"}
            radius={0}
            buttonStyle={styles.buttonLStyle}
            titleStyle={{ fontSize: scaleSizeW(13) }}
            onPress={handleAddCart}
          />
        </View>
        <View style={styles.buttonWrap}>
          <Button
            color="#E36255"
            title={"立即购买"}
            radius={0}
            buttonStyle={styles.buttonRStyle}
            titleStyle={{ fontSize: scaleSizeW(13) }}
            onPress={handleBuyNow}
          />
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContaniner: {
    flexDirection: "row",
    height: scaleSizeW(40),
    marginRight: scaleSizeW(10),
  },
  buttonWrap: { flex: 1, justifyContent: "center" },
  buttonLStyle: {
    borderTopLeftRadius: scaleSizeW(25),
    borderBottomLeftRadius: scaleSizeW(25),
  },
  buttonRStyle: {
    borderTopRightRadius: scaleSizeW(25),
    borderBottomRightRadius: scaleSizeW(25),
  },
});
