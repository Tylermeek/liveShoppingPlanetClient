import { Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./componets/HeaderBar";

type homeProps = {
}

const Home: React.FC<homeProps> = () => {
    return <>
        <View style={styles.home}>
            <HeaderBar></HeaderBar>
        </View>
    </>
}

const styles = StyleSheet.create({
    home: {
        marginTop: StatusBar.currentHeight
    }
})

export default Home
