import { Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";

const Home: React.FC = () => {
    return <>
        <View style={styles.home}>
            <Text h1>首页</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    home: {
        marginTop: StatusBar.currentHeight
    }
})

export default Home
