import { Avatar } from "@rneui/base";
import { Button, Image, Text } from "@rneui/themed";
import { ContentCardProps } from "components/WaterFall";
import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import { LiveInfo } from "types/info";
import { numberFormat } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface CardProps extends ContentCardProps {
    contentInfo: LiveInfo
    bindRef?: Function
}


const LiveCard: React.FC<CardProps> = ({
    contentInfo,
    bindRef
}) => {

    const handlePressLive = () => {
        console.log(contentInfo.title, contentInfo.isOnLive);

    }
    const handlePressShop = () => {
        console.log(contentInfo.shopInfo.name);

    }

    const handlePressSubscribe = () => {
        console.log(contentInfo.shopInfo.name);
    }

    return <>
        <View style={{ height: scaleSizeH(450), marginBottom: scaleSizeW(10) }}>
            <View style={styles.banner}>
                <TouchableOpacity style={styles.shop} onPress={handlePressShop}>
                    <Avatar source={{ uri: contentInfo.shopInfo.avatar }} rounded>
                    </Avatar>
                    <View style={{ flex: 1, marginLeft: scaleSizeW(5) }}>
                        <Text style={{ color: "black", fontSize: scaleSizeW(11) }}>{contentInfo.shopInfo.name}</Text>
                        <Text style={{ color: "#484b4e", fontSize: scaleSizeW(10) }}>{numberFormat(contentInfo.shopInfo.follower)}粉丝</Text>
                    </View>
                </TouchableOpacity>
                <Button
                    title={"关注"}
                    size="sm"
                    titleStyle={{ width: scaleSizeW(45), fontSize: scaleSizeW(10) }}
                    radius={"md"}
                    containerStyle={{ flexDirection: "row", height: scaleSizeH(25), marginRight: scaleSizeW(10) }}
                    onPress={handlePressSubscribe}
                >
                </Button>
            </View>
            <TouchableOpacity style={styles.coverContainer} onPress={handlePressLive}>
                <Image source={{ uri: contentInfo.cover }} style={{ width: "100%", height: "100%", borderRadius: scaleSizeW(10) }} />
                <View style={[styles.liveStatusContainer, { backgroundColor: contentInfo.isOnLive ? "#E36235" : "#F3C262" }]}>
                    <Text style={styles.liveStatus}
                    >
                        {contentInfo.isOnLive ? "直播中" : "未开播"}
                    </Text>
                </View>
                <Text style={styles.liveTitle}>
                    {
                        contentInfo.title
                    }
                </Text>
            </TouchableOpacity>
        </View>
    </>
}

const styles = StyleSheet.create({
    banner: {
        height: scaleSizeH(50),
        // backgroundColor: "grey",
        flexDirection: "row",
        alignItems: "center"
    },
    coverContainer: {
        flex: 1,
        marginTop: scaleSizeW(2.5)
    },
    shop: {
        flex: 1,
        marginLeft: scaleSizeW(10),
        flexDirection: "row"
    },
    liveStatusContainer: {
        height: scaleSizeH(20),
        padding: scaleSizeW(10),
        paddingTop: 0,
        paddingBottom: 0,
        position: "absolute",
        top: scaleSizeW(10),
        left: scaleSizeW(10),
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#E36235",
        borderRadius: scaleSizeW(20)
    },
    liveStatus: {
        fontSize: scaleSizeW(10),
        color: "white",
    },
    liveTitle: {
        position: "absolute",
        color:"white",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(112, 117, 122,0.3)",
        height: scaleSizeH(50),
        borderBottomLeftRadius: scaleSizeW(10),
        borderBottomRightRadius: scaleSizeW(10),
        fontSize: scaleSizeW(15),
        fontWeight: "600",
        textAlign: "center",
        lineHeight: scaleSizeH(50)
    }
})

export default LiveCard
