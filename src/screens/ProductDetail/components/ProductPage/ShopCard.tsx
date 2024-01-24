import { Button } from "@rneui/base";
import { Avatar, Divider, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ShopInfo } from "types/info";
import { numberFormat } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface ShopCardProps {
    shopInfo: ShopInfo
}

const RateLevel: React.FC<{ num: number }> = ({ num }) => {
    if (num > 4.85) {
        return <Text style={{ fontSize: scaleSizeW(10), color: "#E36235" }}> 高</Text >
    }
    if (num > 4.8) {
        return <Text style={{ fontSize: scaleSizeW(10), color: "#EC9A86" }}>平</Text>
    }
    else {
        return <Text style={{ fontSize: scaleSizeW(10), color: "#E36235" }}>低</Text>
    }
}

const ShopCard: React.FC<ShopCardProps> = ({ shopInfo }) => {
    return <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Avatar size={40} source={{ uri: shopInfo?.avatar }} />
            <Text style={{ marginLeft: scaleSizeW(5), fontSize: scaleSizeW(13) }}>{shopInfo.name}</Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-evenly", alignItems: "center", marginTop: scaleSizeW(5) }}>
            <View style={{ flexDirection: "row", justifyContent: "space-evenly", flex:1 }}>
                <View style={styles.detailContainer}>
                    <Text>{shopInfo.productNum}</Text>
                    <Text style={styles.detailTitle}>全部宝贝</Text>
                </View>
                <View>
                    <Text>{numberFormat(shopInfo.follower)}</Text>
                    <Text style={styles.detailTitle}>关注人数</Text>
                </View>
            </View>
            <View style={{flex:1, alignItems:"center"}}>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateTitle}>宝贝描述</Text>
                    <Text style={styles.rateNum}>{shopInfo.rate.productDescription}</Text>
                    <RateLevel num={shopInfo.rate.productDescription} />
                </View>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateTitle}>商家服务</Text>
                    <Text style={styles.rateNum}>{shopInfo.rate.sellerService}</Text>
                    <RateLevel num={shopInfo.rate.sellerService} />
                </View>
                <View style={styles.rateContainer}>
                    <Text style={styles.rateTitle}>物流服务</Text>
                    <Text style={styles.rateNum}>{shopInfo.rate.logisticsServices}</Text>
                    <RateLevel num={shopInfo.rate.logisticsServices} />
                </View>
            </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-around", marginTop:scaleSizeW(5) }}>
            <Button title={"查看分类"} titleStyle={styles.buttonTitle} color={"transparent"} />
            <Divider orientation="vertical" />
            <Button title={"进店逛逛"} titleStyle={styles.buttonTitle} color={"transparent"} />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: scaleSizeH(10),
        padding: scaleSizeW(10)
    },
    detailContainer: {
        width: scaleSizeW(70),
        alignItems: "center",
    },
    detailTitle: {
        fontSize: scaleSizeW(10),
        color: "rgba(153, 153, 153, 1)"
    },
    rateContainer: {
        flexDirection: "row",
        width: scaleSizeW(100),
        justifyContent: "space-evenly"
    },
    rateTitle: {
        fontSize: scaleSizeW(10),
        color: "rgba(153, 153, 153, 1)",
    },
    rateNum: {
        fontSize: scaleSizeW(10),
    },
    buttonTitle: {
        width:scaleSizeW(70),
        color: "black",
        fontSize: scaleSizeW(10)
    }
})

export default ShopCard
