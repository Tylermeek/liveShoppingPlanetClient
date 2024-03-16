import { useNavigation } from "@react-navigation/native";
import { Avatar, Card, Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Views } from "types/navigation";
import { LiveInfo, ProductInfo, InfoType } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { isProductInfo } from "utlis/type";

export interface ContentCardProps {
    contentInfo: LiveInfo | ProductInfo
    bindRef?: Function
}

const ContentCard: React.FC<ContentCardProps> = ({ contentInfo, bindRef = null }) => {
    const navigation = useNavigation()
    const handlePress = (contentInfo: LiveInfo | ProductInfo) => {
        console.log(contentInfo.title, contentInfo.type);
        if (contentInfo.type === InfoType.ProductInfo) {
            navigation.navigate(Views.ProductDetail, { goodsId: contentInfo.id })
        }

    }

    return <>
        <TouchableOpacity ref={(ref) => bindRef && bindRef(ref)} style={[styles.container, { height: scaleSizeH(isProductInfo(contentInfo) ? 200 : 250) }]} onPress={() => handlePress(contentInfo)}>
            <View style={{ flex: 1 }}>
                <Image source={{ uri: contentInfo.cover }} style={{ height: "100%", width: "100%", borderTopLeftRadius: scaleSizeW(5), borderTopRightRadius: scaleSizeW(5) }} ></Image>
            </View>
            <View style={{ padding: scaleSizeH(5) }}>
                <Text style={{ height: scaleSizeH(20), fontSize: scaleSizeH(10), lineHeight: scaleSizeH(20) }}>{contentInfo.title}</Text>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                    {(contentInfo.type === InfoType.ProductInfo)
                        ?
                        <>
                            <Text style={{ fontSize: scaleSizeH(9), color: "red" }}>￥{contentInfo.price}</Text>
                            <Text style={{ fontSize: scaleSizeH(5), color: "grey", marginLeft: scaleSizeW(10) }}>{contentInfo.sold}+人付款</Text>
                        </>
                        :
                        <>
                            <Text style={{ fontSize: scaleSizeH(9), color: "grey" }}>{contentInfo.anchor}</Text>
                            <Text style={{ fontSize: scaleSizeH(5), color: "grey", marginLeft: scaleSizeW(10) }}>正在直播中</Text>
                        </>
                    }
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
    }
})

export default ContentCard
