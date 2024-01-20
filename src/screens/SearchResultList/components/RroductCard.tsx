import { Avatar, Card, Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LiveInfo, ProductInfo, InfoType } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { isProductInfo } from "utlis/type";
import { ContentCardProps } from "../../../components/WaterFall";

export interface CardProps extends ContentCardProps {
    contentInfo: ProductInfo
    bindRef?: Function
}

const RroductCard: React.FC<CardProps> = ({ contentInfo, bindRef = null }) => {

    const handlePress = (contentInfo: ProductInfo) => {
        console.log(contentInfo.title, contentInfo.type);

    }

    return <>
        <TouchableOpacity ref={(ref) => bindRef && bindRef(ref)} style={[styles.container, { height: scaleSizeH(200) }]} onPress={() => handlePress(contentInfo)}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: contentInfo.cover }} style={{ height: "100%", width: "100%", borderTopLeftRadius: scaleSizeW(5), borderTopRightRadius: scaleSizeW(5) }} ></Image>
            </View>
            <View style={styles.infoContainer}>
                <Text style={{ height: scaleSizeH(20), fontSize: scaleSizeH(10), lineHeight: scaleSizeH(20) }}>{contentInfo.title}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                    <Text style={{ fontSize: scaleSizeH(9), color: "red" }}>￥{contentInfo.price}</Text>
                    <Text style={{ fontSize: scaleSizeH(5), color: "grey", marginLeft: scaleSizeW(10) }}>{contentInfo.sold}+人付款</Text>
                </View>
            </View>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: scaleSizeW(10),
        backgroundColor: "white",
        borderRadius: scaleSizeW(5),
        display: "flex",
    },
    infoContainer: {
        padding: scaleSizeH(5),
        borderWidth: scaleSizeW(0.5),
        borderRadius: scaleSizeW(5),
        borderTopLeftRadius:0,
        borderTopRightRadius:0,
        borderTopWidth:0,
        borderColor: "#c5c7c9",
    }
})

export default RroductCard
