import { Avatar, Card, Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LiveInfo, ProductInfo, InfoType } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { isProductInfo } from "utlis/type";

export interface ContentCardProps {
    contentInfo: LiveInfo | ProductInfo
}

const ContentCard: React.FC<ContentCardProps> = ({ contentInfo }) => {

    const handlePress = (contentInfo: LiveInfo | ProductInfo) => {
        console.log(contentInfo.title, contentInfo.type);

    }

    return <>
        <TouchableOpacity style={styles.container} onPress={() => handlePress(contentInfo)}>
            <View style={{ flex: 3 }}>
                <Image source={{ uri: contentInfo.cover }} style={{ height: scaleSizeH(isProductInfo(contentInfo) ? 147.5 : 200), width: "100%", borderTopLeftRadius: scaleSizeW(5), borderTopRightRadius: scaleSizeW(5) }} ></Image>
            </View>
            <View style={{ flex: 1, padding: scaleSizeH(5) }}>
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
