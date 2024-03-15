import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import TopBanner from "./components/TopBanner";
import CartList from "./components/CartList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomBanner from "./components/BottomBanner";
import { Views } from "types/navigation";
import { useAuth } from "hook/useAuth";
import { useNavigation } from "@react-navigation/native";

const Cart: React.FC = () => {
  const navigation = useNavigation();
  const { canVisit } = useAuth(Views.Cart);

  useEffect(() => {
    console.log(canVisit);
    // dispatch(getCartlistThunk())
    if (!canVisit) navigation.navigate(Views.LogIn);
  }, [canVisit]);
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
