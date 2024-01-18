import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./components/HeaderBar";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import FuncBlock from "./components/FuncBlock";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import RecommendList from "./components/RecommendList";
import { getRecommendlist } from "axios/api/recommend";
import { randomArr } from "utlis/method";
import { LiveInfo, ProductInfo } from "types/info";

type HomeProps = CompositeTabScreenParamList<"Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [list, setList] = useState<(LiveInfo | ProductInfo)[]>([])
    useEffect(() => {
        getRecommendlist()
            .then(res => {
                const randomList: (LiveInfo | ProductInfo)[] = [...res.data.liveList, ...res.data.productList]
                randomArr(randomList)
                setList(randomList)
                console.log(randomList);
            })
    }, [])
    return <>
        <View style={styles.home}>
            <LinearGradient colors={["rgba(227,98,85,1)", "rgba(227,98,85,1)", 'rgba(236,154,134,0.48)', 'rgba(236,154,134,0)']} style={styles.linearGradient}>
            </LinearGradient>
            <HeaderBar></HeaderBar>
            <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false}>
                <LinearGradient colors={["#ffffff", "#fff7f7", '#ebebeb', '#e3e3e3']} style={[styles.linearGradient, { borderRadius: scaleSizeW(10) }]}>
                </LinearGradient>
                <FuncBlock></FuncBlock>
                <RecommendList list={list}></RecommendList>
            </ScrollView>
        </View>

    </>
}

const styles = StyleSheet.create({
    home: {
        display: "flex",
        height: "100%"
    },
    linearGradient: {
        height: scaleSizeH(260),
        width: "100%",
        position: "absolute",
    },
    mainContainer: {
        flex: 1,
        margin: scaleSizeW(5),
        backgroundColor: "#e3e3e3",
        borderTopLeftRadius: scaleSizeW(10),
        borderTopRightRadius: scaleSizeW(10),
    }
})

export default Home
