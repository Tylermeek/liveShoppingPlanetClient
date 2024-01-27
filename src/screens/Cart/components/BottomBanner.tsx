import { ListItem, Text, Button } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const BottomBanner: React.FC = () => {

    const handleCheckAll = () => {
        // todo 勾选全部
    }

    const handleSettleCart = () => {
        // todo 结算购物车
    }
    return (
        <View style={styles.contanier}>
            <ListItem>
                <ListItem.CheckBox checked={false} title={"全选"} onPress={handleCheckAll} textStyle={{color:"#acacad"}}/>
                <ListItem.Content>
                    <View style={{ width: "100%", flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <Text style={{ fontSize: scaleSizeW(10), marginRight: scaleSizeW(10) }}>
                            合计:<Text style={{ color: "#E36235", fontSize: scaleSizeW(13) }}>￥{11}</Text>
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
