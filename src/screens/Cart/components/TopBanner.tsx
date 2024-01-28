import { Button, Icon } from "@rneui/base";
import { Divider, Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { CartStatus, changeCartStatus, delAllProducts, delProducts } from "slice/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const TopBanner: React.FC = () => {
    const { cartStatus } = useAppSelector((state) => state.cartInfo)
    const dispatch = useAppDispatch()
    const handleEditCart = () => {
        dispatch(changeCartStatus(CartStatus.Editing))
    }

    const handleFinishEdit = () => {
        dispatch(changeCartStatus(CartStatus.Fetched))
    }

    const handleDelAll = () => {
        // console.warn("del all")
        dispatch(delAllProducts())
    }

    const handleDel = () => {
        // console.warn("del")
        dispatch(delProducts())
    }

    return (
        <View style={styles.contanier}>
            <Text style={{ fontSize: scaleSizeW(16), marginLeft: scaleSizeW(10), fontWeight: "bold" }}>购物车</Text>
            <View style={styles.controlContanier}>
                {
                    cartStatus === CartStatus.Editing ?
                        <>
                            <Button
                                title={"删除全部"}
                                color={"#E36235"}
                                titleStyle={[styles.controlTitle, { color: "black" }]}
                                onPress={handleDelAll}
                                buttonStyle={styles.controlButton}
                            />
                            <Button
                                title={"删除"}
                                color={"#EC9A86"}
                                titleStyle={[styles.controlTitle, { color: "black" }]}
                                onPress={handleDel}
                                buttonStyle={styles.controlButton}
                            />
                            <Button
                                title={"完成"}
                                color={"#e3e3e3"}
                                titleStyle={styles.controlTitle}
                                onPress={handleFinishEdit}
                                buttonStyle={[styles.controlButton, { marginRight: 0 }]}
                            />
                        </>
                        :
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
