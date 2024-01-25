import React, { useEffect, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./components/HeaderBar";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import FuncBlock from "./components/FuncBlock";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import RecommendList from "./components/RecommendList";
import { getRecommendlist } from "axios/api/recommend";
import { handleMomentumScrollEnd, randomArr } from "utlis/method";
import { LiveInfo, ProductInfo } from "types/info";
import AdBanner from "./components/AdBanner";
import { debounce } from "lodash-es";
import { Button } from "@rneui/themed";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type HomeProps = CompositeTabScreenParamList<"Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [isEndReached, setIsEndReached] = useState<boolean>(false)




    // const handleRefresh = React.useCallback(() => {
    //     setRefreshing(true);
    //     setPageNo(1)
    //     handleinitList().finally(() => {
    //         setRefreshing(false);
    //     })
    // }, []);




    return <>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <LinearGradient colors={["rgba(227,98,85,1)", "rgba(227,98,85,1)", 'rgba(236,154,134,0.48)', 'rgba(236,154,134,0)']} style={styles.linearGradient}>
            </LinearGradient>
            <HeaderBar></HeaderBar>
            <ScrollView
                style={styles.mainContainer}
                showsVerticalScrollIndicator={false}
                onScroll={(event) => handleMomentumScrollEnd(event, isEndReached, setIsEndReached)}
                scrollEventThrottle={50}
            >
                <LinearGradient colors={["#ffffff", "#fff7f7", '#ebebeb', '#e3e3e3']} style={[styles.linearGradient, { borderRadius: scaleSizeW(10) }]}>
                </LinearGradient>
                <FuncBlock></FuncBlock>
                <AdBanner></AdBanner>
                <RecommendList isEndReached={isEndReached}></RecommendList>
            </ScrollView>
        </GestureHandlerRootView>
    </>
}

const styles = StyleSheet.create({
    linearGradient: {
        height: scaleSizeH(260),
        width: "100%",
        position: "absolute",
    },
    mainContainer: {
        flex: 1,
        margin: scaleSizeW(5),
        marginBottom: 0,
        backgroundColor: "#e3e3e3",
        borderTopLeftRadius: scaleSizeW(10),
        borderTopRightRadius: scaleSizeW(10),
    }
})

export default Home
