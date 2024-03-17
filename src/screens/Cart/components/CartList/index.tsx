import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCartlistThunk } from "slice/cart/cartSlice";
import { Button } from "@rneui/base";
import { handleMomentumScrollEnd } from "utlis/method";
import { CartStatus } from "types/cart";
import ProductCart from "./ProductCart";
import { useFocusEffect } from "@react-navigation/native";

const CartList: React.FC = () => {
  const { cartList, cartTotal, cartStatus } = useAppSelector(
    (state) => state.cartInfo
  );
  const dispatch = useAppDispatch();
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  useFocusEffect(
    useCallback(() => {
      dispatch(getCartlistThunk());
    }, [])
  );
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.contanier}
        showsVerticalScrollIndicator={false}
        onScroll={(event) =>
          handleMomentumScrollEnd(event, isEndReached, setIsEndReached)
        }
        scrollEventThrottle={50}
      >
        {cartList &&
          cartList.map((pro) => {
            return <ProductCart key={pro.id} product={pro}></ProductCart>;
          })}
        {/* <RecommendList isEndReached={isEndReached} ></RecommendList> */}
      </ScrollView>
      {cartStatus === CartStatus.Loading && (
        <Button
          loading
          radius={"lg"}
          color={"#E36235"}
          containerStyle={styles.loadingContainer}
          buttonStyle={styles.loading}
          titleStyle={{ fontSize: scaleSizeW(12) }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    padding: scaleSizeW(10),
  },
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

export default CartList;
