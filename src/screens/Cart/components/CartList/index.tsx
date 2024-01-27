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
        padding: scaleSizeW(10),
    }
})

export default CartList
