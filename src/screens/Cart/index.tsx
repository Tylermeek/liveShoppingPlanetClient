import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import TopBanner from "./components/TopBanner";
import CartList from "./components/CartList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomBanner from "./components/BottomBanner";

const Cart: React.FC = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TopBanner />
      <CartList />
      <BottomBanner />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default Cart;
