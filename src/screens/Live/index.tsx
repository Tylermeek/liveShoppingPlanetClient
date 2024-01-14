import { Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

const Live: React.FC = () => {
    return <>
        <View style={styles.live}>
            <Text h1>直播</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    live: {
        marginTop: StatusBar.currentHeight
    }
})

export default Live
