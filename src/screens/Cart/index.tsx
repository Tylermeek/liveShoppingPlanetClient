import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import TopBanner from "./components/TopBanner";
import CartList from "./components/CartList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getCartlistThunk } from "slice/cart/cartSlice";
import BottomBanner from "./components/BottomBanner";

const Cart: React.FC = () => {
    const cartInfo = useAppSelector((state) => { state.cartInfo })
    const dispatch = useAppDispatch()
    useEffect(() => {
        // dispatch(getCartlistThunk())
    }, [])
    return <GestureHandlerRootView style={{ flex: 1 }}>
        <TopBanner />
        <CartList />
        <BottomBanner />
    </GestureHandlerRootView>
}

const styles = StyleSheet.create({

})

export default Cart
