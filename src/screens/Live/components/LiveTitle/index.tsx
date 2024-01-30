import { Button, Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";

interface LiveTitleProps {
    liveTitle: string
    liveUser: string
}
const LiveTitle: React.FC<LiveTitleProps> = ({ liveTitle, liveUser }) => {

    return <>
        <View style={styles.titleContainer}>
            <Text style={{ fontSize: scaleSizeW(16), fontWeight: "bold", color: "white" }}>@{liveUser}</Text>
            <Text style={{ fontSize: scaleSizeW(13), color: "white" }}>{liveTitle}</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    titleContainer: {
        position: "absolute",
        bottom: "5%",
        left: "5%"
    }
})

export default LiveTitle
