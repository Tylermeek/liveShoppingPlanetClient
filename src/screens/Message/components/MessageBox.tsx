import { Badge, Divider, Image, Text } from "@rneui/themed";
import dayjs from "dayjs";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";

interface shop {
    avatar: string;
    name: string;
}

interface LastChatRecord {
    time: string;
    message: string;
    read: boolean;
}

export interface MsgData {
    shop: shop;
    lastChatRecord: LastChatRecord;
}

export default function MessageBox({ msg }: { msg: MsgData }) {
    function handleMsgDetail(): void {
        console.log("handleMsgDetail.");
    }

    return (
        <>
            <TouchableOpacity style={styles.container} onPress={handleMsgDetail}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ height: scaleSizeW(40), width: scaleSizeW(40) }}>
                        <Image source={{ uri: msg.shop.avatar }} style={{ width: "100%", height: "100%", borderRadius: scaleSizeW(5) }} />
                    </View>
                    <View style={{ marginLeft: scaleSizeW(10) }}>
                        <Text h3>{msg.shop.name}</Text>
                        <Text style={{ color: "grey", marginTop: scaleSizeW(5), fontSize:scaleSizeW(11) }}>{msg.lastChatRecord.message}</Text>
                    </View>
                </View>
                <Text>{dayjs(msg.lastChatRecord.time).format("dddd")}</Text>
                {
                    !msg.lastChatRecord.read
                    &&
                    <Badge status="error" containerStyle={{ position: "absolute", left: 5, top: 5 }} />
                }
            </TouchableOpacity>
            <Divider />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: scaleSizeW(10),
        // marginBottom: 0,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",

    }
})