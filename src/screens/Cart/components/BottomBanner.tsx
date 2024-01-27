import { ListItem, Text, Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { changeCheckAllStatus } from "slice/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const BottomBanner: React.FC = () => {
    const { shops, products, totalMoney } = useAppSelector((state) => state.cartInfo)
    const dispatch = useAppDispatch()
    const handleCheckAll = () => {
        // todo 勾选全部
        dispatch(changeCheckAllStatus())
    }

    const handleSettleCart = () => {
        // todo 结算购物车
    }
    return (
        <View style={styles.contanier}>
            <ListItem>
                <ListItem.CheckBox
                    title={"全选"}
                    textStyle={{ color: "#acacad" }}
                    checked={!!shops?.allIds && (shops.allIds.filter((shopId) => {
                        return shops.byId[shopId].buyProducts.filter(proId => {
                            return products?.byId[proId].checked
                        }).length === shops.byId[shopId].buyProducts.length
                    }).length === shops.allIds.length)}
                    onPress={handleCheckAll} />
                <ListItem.Content>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <Text style={{ fontSize: scaleSizeW(10), marginRight: scaleSizeW(10) }}>
                            合计:<Text style={{ color: "#E36235", fontSize: scaleSizeW(13) }}>￥{totalMoney}</Text>
                        </Text>
                        <Button
                            color={"primary"}
                            radius={"lg"}
                            buttonStyle={{ paddingLeft: scaleSizeW(20), paddingRight: scaleSizeW(20) }}
                            titleStyle={{ fontSize: scaleSizeW(13) }}
                            onPress={handleSettleCart}
                        >
                            结算
                        </Button>
                    </View>
                </ListItem.Content>
            </ListItem>
        </View>
    )
}

const styles = StyleSheet.create({
    contanier: {
        // height:scaleSizeH(48),
        backgroundColor: "white",
        borderTopLeftRadius: scaleSizeW(10),
        borderTopRightRadius: scaleSizeW(10),
        borderTopColor: "#dadce0",
        borderTopWidth: 0.5
    }
})

export default BottomBanner
