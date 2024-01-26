import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";
import ShopCart from "./ShopCart";
import { ListItem, Text } from "@rneui/themed";

const CartList: React.FC = () => {
    return <ScrollView style={styles.contanier}>
        <ShopCart></ShopCart>
    </ScrollView>
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        backgroundColor: "white",
        borderTopLeftRadius: scaleSizeW(15),
        borderTopRightRadius: scaleSizeW(15),
        padding: scaleSizeW(5),
    }
})

export default CartList
