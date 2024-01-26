import { Button, Icon } from "@rneui/base";
import { Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const TopBanner: React.FC = () => {
    return (
        <View style={styles.contanier}>
            <Text style={{ fontSize: scaleSizeW(16), marginLeft:scaleSizeW(10), fontWeight: "bold" }}>购物车</Text>
            <View style={styles.controlContanier}>
                <Button
                    title={"管理"}
                    color={"transparent"}
                    titleStyle={{ fontSize: scaleSizeW(12), color: "rgba(80, 80, 80, 1)" }}
                />
                <Button color={"transparent"} >
                    <Icon name="share" size={20} color={"rgba(153, 153, 153, 1)"}></Icon>
                </Button>
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
        alignItems:"center"
        // backgroundColor: "yellow"
    },
    controlContanier: {
        flexDirection: "row",
        width: scaleSizeW(100),
        justifyContent: "space-evenly"
    }
})

export default TopBanner
