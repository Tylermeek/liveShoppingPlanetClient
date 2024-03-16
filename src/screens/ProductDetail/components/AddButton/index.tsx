import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { scaleSizeW } from "utlis/scaleSize";
import { useAppDispatch } from "store/hooks";
import { useRequest } from "ahooks";
import { getGoodsDetail } from "axios/api/goods";
import { addProThunk } from "slice/cart/cartSlice";

export default function AddButton({
  goodsId,
  num,
}: {
  goodsId: number;
  num: number;
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
      dispatch(addProThunk({ productId, goodsId, number: num }));
    }
  };
  return (
    <View style={styles.buttonWrap}>
      <Button
        color="#EC9A86"
        title={"加入购物车"}
        radius={0}
        buttonStyle={styles.buttonLStyle}
        containerStyle={{ borderRadius: scaleSizeW(25) }}
        titleStyle={{ fontSize: scaleSizeW(13) }}
        onPress={handleAddCart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonWrap: {
    flex: 1,
    justifyContent: "center",
    marginTop: scaleSizeW(10),
    // borderRadius: scaleSizeW(25),
  },
  buttonLStyle: {
    borderRadius: scaleSizeW(25),
  },
});
