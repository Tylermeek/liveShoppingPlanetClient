import { Avatar, Card, Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { LiveInfo, ProductInfo, InfoType } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { isProductInfo } from "utlis/type";
import { ContentCardProps } from "../../../components/WaterFall";
import { isEmptyArr } from "utlis/method";
import { Icon } from "@rneui/base";

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
            <View style={{ flex: 1, marginBottom: scaleSizeW(2.5) }}>
                <Image source={{ uri: contentInfo.cover }} style={styles.cover} ></Image>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.titleContainer}>
                    {
                        contentInfo.activity &&
                        <Text style={styles.activity}>{contentInfo.activity}</Text>
                    }
                    <Text style={styles.title} numberOfLines={2} ellipsizeMode="clip">{contentInfo.title}</Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: scaleSizeW(2.5) }}>
                    {
                        !isEmptyArr(contentInfo.specification || []) &&
                        contentInfo.specification?.map((spec, index) => {
                            return <Text key={spec} style={styles.specification}>
                                {index !== 0 && "|"} {spec}
                            </Text>
                        })
                    }
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", marginBottom: scaleSizeW(2.5) }}>
                    <Text style={{ fontSize: scaleSizeW(11), color: "red" }}>￥{contentInfo.price}</Text>
                    <Text style={{ fontSize: scaleSizeW(7), color: "grey", marginLeft: scaleSizeW(10) }}>{contentInfo.sold}+人付款</Text>
                </View>
                <View style={styles.shopInfo}>
                    <TouchableOpacity style={styles.shopButton}>
                        <Text style={styles.shopTitle}>{contentInfo.shopInfo.shopName}</Text>
                        <Icon name="chevron-right" size={scaleSizeW(8)} ></Icon>
                    </TouchableOpacity>
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
    cover: {
        height: "100%",
        width: "100%",
        borderTopLeftRadius: scaleSizeW(5),
        borderTopRightRadius: scaleSizeW(5)
    },
    infoContainer: {
        padding: scaleSizeH(5),
        borderWidth: scaleSizeW(0.5),
        borderRadius: scaleSizeW(5),
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderTopWidth: 0,
        borderColor: "#c5c7c9",
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginBottom: scaleSizeW(2.5)
    },
    activity: {
        height: scaleSizeH(15),
        fontSize: scaleSizeW(9),
        lineHeight: scaleSizeH(15),
        backgroundColor: "#E36235",
        color: "white",
        fontWeight: "700",
        borderRadius: scaleSizeW(5),
        paddingLeft: scaleSizeW(2),
        paddingRight: scaleSizeW(2),
        marginRight: scaleSizeW(5)
    },
    title: {
        flex: 1,
        fontSize: scaleSizeW(10.5),
        lineHeight: scaleSizeH(15),
        fontWeight: "400",
    },
    specification: {
        height: scaleSizeH(10),
        fontSize: scaleSizeW(7),
        color: "grey",
    },
    shopInfo: {
        flexDirection: "row",
    },
    shopButton: {
        backgroundColor: "#e3e6e8",
        flexDirection: "row",
        alignItems: "center",
        padding:scaleSizeW(1.5),
        paddingLeft:scaleSizeW(5),
        paddingRight:scaleSizeW(5),
        borderRadius:scaleSizeW(10),
        height:scaleSizeH(15)
    },
    shopTitle:{
        fontSize:scaleSizeW(8),
        color:"#70757a",
        marginRight:scaleSizeW(2.5),
        lineHeight:scaleSizeH(15),
        height:scaleSizeH(15)
    }
})

export default RroductCard
