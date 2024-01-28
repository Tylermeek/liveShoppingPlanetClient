import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import ShopCart from "./ShopCart";
import { ListItem, Skeleton, Text } from "@rneui/themed";
import { useAppSelector } from "store/hooks";
import { CartStatus } from "slice/cart/cartSlice";
import { Button } from "@rneui/base";

const CartList: React.FC = () => {
    const { shops, cartStatus } = useAppSelector((state) => state.cartInfo)
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.contanier}>

                {
                    shops && shops.allIds.map((shopId) => {
                        return <ShopCart key={shopId} shop={shops.byId[shopId]} />
                    })
                }
            </ScrollView>
            {
                cartStatus === CartStatus.Loading
                && <Button
                    loading
                    radius={"lg"}
                    color={"#E36235"}
                    containerStyle={styles.loadingContainer}
                    buttonStyle={styles.loading}
                    titleStyle={{ fontSize: scaleSizeW(12) }}
                     />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    contanier: {
        flex: 1,
        padding: scaleSizeW(10),
    },
    loading: {
        padding: 0,
        width: scaleSizeW(20)
        // top: "50%",
        // left: "50%",
        // position: "absolute",
        // transform: [{ translateX: -50 }, { translateY: -50 }]
    },
    loadingContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
    }
})

export default CartList
