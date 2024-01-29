import { ListItem, Text, Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { CartStatus, changeCartStatus, changeCheckAllStatus, delAllProducts, delProducts } from "slice/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const BottomBanner: React.FC = () => {
    const { shops, products, totalMoney, cartStatus } = useAppSelector((state) => state.cartInfo)
    const dispatch = useAppDispatch()
    const handleCheckAll = () => {
        dispatch(changeCheckAllStatus())
    }

    const handleSettleCart = () => {
        // todo 结算购物车
    }

    const handleFinishEdit = () => {
        // todo 提交信息
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
            <ListItem containerStyle={{ padding: scaleSizeW(15) }}>
                <ListItem.CheckBox
                    title={"全选"}
                    textStyle={{ color: "#acacad", fontSize: scaleSizeW(10) }}
                    checked={!!shops?.allIds.length && (shops.allIds.filter((shopId) => {
                        return shops.byId[shopId].buyProducts.filter(proId => {
                            return products?.byId[proId].checked
                        }).length === shops.byId[shopId].buyProducts.length
                    }).length === shops.allIds.length)}
                    onPress={handleCheckAll} />
                <ListItem.Content style={{ padding: scaleSizeW(2) }}>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        {
                            cartStatus === CartStatus.Editing
                                ?
                                <>
                                    <Button
                                        title={"删除全部"}
                                        color={"#E36235"}
                                        titleStyle={[styles.controlTitle, { color: "black" }]}
                                        onPress={handleDelAll}
                                        buttonStyle={styles.controlButton}
                                        containerStyle={{ marginRight: scaleSizeW(5) }}
                                    />
                                    <Button
                                        title={"删除"}
                                        color={"#EC9A86"}
                                        titleStyle={[styles.controlTitle, { color: "black" }]}
                                        onPress={handleDel}
                                        buttonStyle={styles.controlButton}
                                        containerStyle={{ marginRight: scaleSizeW(5) }}
                                    />
                                    <Button
                                        title={"完成"}
                                        color={"#e3e3e3"}
                                        titleStyle={styles.controlTitle}
                                        onPress={handleFinishEdit}
                                        buttonStyle={[styles.controlButton, { marginRight: 0 }]}
                                        containerStyle={{ marginRight: scaleSizeW(5) }}
                                    />
                                </>
                                : cartStatus === CartStatus.Calculating
                                    ?
                                    <>
                                        <Text style={{ fontSize: scaleSizeW(10), color: "#E36235" }}>
                                            计算中...
                                        </Text>
                                        <Button
                                            loading
                                            type="clear"
                                            radius={"lg"}
                                            color={"#E36235"}
                                            buttonStyle={{ padding: 0 }}
                                            titleStyle={{ fontSize: scaleSizeW(10) }}
                                        />
                                        <Button
                                            color={"primary"}
                                            radius={"lg"}
                                            buttonStyle={{ paddingLeft: scaleSizeW(20), paddingRight: scaleSizeW(20) }}
                                            titleStyle={{ fontSize: scaleSizeW(13) }}
                                            onPress={handleSettleCart}
                                            disabled
                                        >
                                            结算
                                        </Button>
                                    </>
                                    :
                                    <>
                                        <Text style={{ fontSize: scaleSizeW(12), marginRight: scaleSizeW(10) }}>
                                            合计:<Text style={{ color: "#E36235", fontSize: scaleSizeW(13) }}>￥{totalMoney}</Text>
                                        </Text>
                                        <Button
                                            color={"primary"}
                                            radius={"lg"}
                                            buttonStyle={{ paddingLeft: scaleSizeW(20), paddingRight: scaleSizeW(20) }}
                                            titleStyle={{ fontSize: scaleSizeW(13) }}
                                            onPress={handleSettleCart}
                                            disabled={cartStatus !== CartStatus.Fetched}
                                        >
                                            结算
                                        </Button>
                                    </>

                        }
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
    },
    controlTitle: {
        fontSize: scaleSizeW(11),
        color: "rgba(80, 80, 80, 1)",
        fontWeight: "600"
    },
    controlButton: {
        padding: scaleSizeH(2),
    }


})

export default BottomBanner
