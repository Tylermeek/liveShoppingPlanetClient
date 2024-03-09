import { Avatar, Button, Image, Text } from '@rneui/themed'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { scaleSizeW } from 'utlis/scaleSize'

export default function OrderItem({ order }: any) {

    const handleBuyMore = () => {
        console.log("buymore");
    }
    const handleDelOrder = () => {
        console.log("del");
    }
    const handleCheckDetail = () => {
        console.log("check");
    }

    return (
        <View style={styles.container}>
            <View style={[styles.flexRowBox, { justifyContent: "space-between" }]}>
                <View style={[styles.flexRowBox]}>
                    <Avatar source={{ uri: order.shopInfo.avatar }} rounded />
                    <Text style={{ marginLeft: scaleSizeW(5), fontWeight:"bold" }}>{order.shopInfo.name}</Text>
                </View>
                <Text style={{ color: "#E36235" }}>{order.order_status}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.flexRowBox,
                    { marginTop: scaleSizeW(10), justifyContent: "space-between" }
                ]}
                onPress={handleCheckDetail}
                
            >
                <View style={{ height: scaleSizeW(70), width: scaleSizeW(70) }} >
                    <Image
                        source={{ uri: order.productInfo.product_image }}
                        style={{ height: "100%", width: "100%" }}
                        borderRadius={scaleSizeW(5)}
                    />
                </View>
                <View style={{ marginLeft: scaleSizeW(10), flex: 1 }} >
                    <Text style={{ fontSize: scaleSizeW(16), fontWeight: "600" }}>{order.productInfo.product_name}</Text>
                    <Text style={{ color: "grey", marginTop: scaleSizeW(5) }}>{order.productInfo.sku}</Text>
                </View>
                <View style={{ marginLeft: scaleSizeW(10) }}>
                    <Text style={{ fontSize: scaleSizeW(16), fontWeight: "600" }}>${order.productInfo.unit_price}</Text>
                    <Text style={{ color: "grey", marginTop: scaleSizeW(5) }}>x{order.productInfo.quantity}</Text>
                </View>
            </TouchableOpacity>
            <View style={[styles.flexRowBox, { justifyContent: "flex-end" }]}>
                <Button
                    title="删除订单"
                    type="outline"
                    size="sm"
                    radius="lg"
                    buttonStyle={{ borderColor: "grey" }}
                    titleStyle={{ fontSize: scaleSizeW(11), color: "grey" }}
                    onPress={handleDelOrder}
                />
                <Button
                    title="再买一单"
                    type="outline"
                    size="sm"
                    radius="lg"
                    titleStyle={{ fontSize: scaleSizeW(11) }}
                    containerStyle={{ marginLeft: scaleSizeW(10) }}
                    onPress={handleBuyMore}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    flexRowBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    container: {
        backgroundColor: "white",
        margin: scaleSizeW(10),
        marginBottom: 0,
        borderRadius: scaleSizeW(10),
        padding: scaleSizeW(10),
    }
})