import { Text } from "@rneui/themed";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./componets/HeaderBar";
import { CompositeTabScreenParamList } from "navigators/RootStack";

type HomeProps = CompositeTabScreenParamList<"Home">;

const Home: React.FC<HomeProps> = ({navigation}) => {
    
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
