import { Button, Icon } from "@rneui/base";
import { Divider, Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {  changeCartStatus, delAllProducts, delProducts } from "slice/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { CartStatus } from "types/cart";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const TopBanner: React.FC = () => {
    const { cartStatus } = useAppSelector((state) => state.cartInfo)
    const dispatch = useAppDispatch()
    const handleEditCart = () => {
        dispatch(changeCartStatus(CartStatus.Editing))
    }

    return (
        <View style={styles.contanier}>
            <Text style={{ fontSize: scaleSizeW(16), marginLeft: scaleSizeW(10), fontWeight: "bold" }}>购物车</Text>
            <View style={styles.controlContanier}>
                {
                    cartStatus !== CartStatus.Editing &&
                        <>
                            <Button
                                title={"编辑"}
                                color={"#e3e3e3"}
                                titleStyle={styles.controlTitle}
                                onPress={handleEditCart}
                                buttonStyle={styles.controlButton}
                            />
                            <Button color={"#e3e3e3"} buttonStyle={[styles.controlButton, { marginRight: 0 }]}>
                                <Icon name="share" iconStyle={{ fontSize: scaleSizeW(17) }} color={"rgba(80, 80, 80, 1)"}></Icon>
                            </Button>
                        </>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contanier: {
        height: scaleSizeH(44) + (StatusBar.currentHeight || 0),
        paddingTop: StatusBar.currentHeight,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
        // backgroundColor: "yellow"
    },
    controlContanier: {
        flexDirection: "row",
        // width: scaleSizeW(100),
        justifyContent: "space-evenly",
        marginRight: scaleSizeW(10)
    },
    controlTitle: { fontSize: scaleSizeW(11), color: "rgba(80, 80, 80, 1)", fontWeight: "600" },
    controlButton: { marginRight: scaleSizeW(5), padding: scaleSizeH(2), }
})

export default TopBanner
