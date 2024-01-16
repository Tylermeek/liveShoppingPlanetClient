import { Button, Text } from "@rneui/themed";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./components/HeaderBar";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import LivingFollowingList from "./components/LivingFollowingList";
import FuncBlock from "./components/FuncBlock";

type HomeProps = CompositeTabScreenParamList<"Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {

    return <>
        <View style={styles.home}>
            <HeaderBar></HeaderBar>
            <FuncBlock></FuncBlock>
            <LivingFollowingList></LivingFollowingList>
        </View>
    </>
}

const styles = StyleSheet.create({
    home: {
        marginTop: StatusBar.currentHeight
    }
})

export default Home
