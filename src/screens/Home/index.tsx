import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./components/HeaderBar";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import FuncBlock from "./components/FuncBlock";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LinearGradient } from "expo-linear-gradient";

type HomeProps = CompositeTabScreenParamList<"Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {

    return <>
        <View style={styles.home}>
            <LinearGradient colors={["rgba(227,98,85,1)","rgba(227,98,85,1)",'rgba(236,154,134,0.48)','rgba(236,154,134,0)']} style={styles.linearGradient}>

            </LinearGradient>
            <HeaderBar></HeaderBar>
            <ScrollView style={styles.mainContainer}>
                <FuncBlock></FuncBlock>
            </ScrollView>
        </View>

    </>
}

const styles = StyleSheet.create({
    home: {
        // paddingTop: StatusBar.currentHeight,
    },
    linearGradient:{
        height:scaleSizeH(200),
        width:"100%",
        position:"absolute",
    },
    mainContainer: {
        margin: scaleSizeW(10),
        backgroundColor: "white",
        borderRadius: scaleSizeW(5)
    }
})

export default Home
