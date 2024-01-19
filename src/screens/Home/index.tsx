import React, { useEffect, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import HeaderBar from "./components/HeaderBar";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import FuncBlock from "./components/FuncBlock";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LinearGradient } from "expo-linear-gradient";
import RecommendList from "./components/RecommendList";
import { getRecommendlist } from "axios/api/recommend";
import { randomArr } from "utlis/method";
import { LiveInfo, ProductInfo } from "types/info";
import AdBanner from "./components/AdBanner";
import { debounce } from "lodash-es";

type HomeProps = CompositeTabScreenParamList<"Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [list, setList] = useState<(LiveInfo | ProductInfo)[]>([])
    const [isEndReached, setIsEndReached] = useState<boolean>(false)

    const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const contentHeight = event.nativeEvent.contentSize.height;
        const layoutHeight = event.nativeEvent.layoutMeasurement.height;
        const isEndReachedNow = offsetY >= contentHeight - layoutHeight - scaleSizeH(150);
        if (isEndReachedNow !== isEndReached) {
            setIsEndReached(isEndReachedNow)
        }
    }

    useEffect(() => {
        console.log(isEndReached);
        if(isEndReached){
            // TODO loadMore
        }

    }, [isEndReached])

    useEffect(() => {
        getRecommendlist()
            .then(res => {
                const randomList: (LiveInfo | ProductInfo)[] = [...res.data.liveList, ...res.data.productList]
                randomArr(randomList)
                setList(randomList)
            })
    }, [])


    return <>
        <View style={styles.home}>
            <LinearGradient colors={["rgba(227,98,85,1)", "rgba(227,98,85,1)", 'rgba(236,154,134,0.48)', 'rgba(236,154,134,0)']} style={styles.linearGradient}>
            </LinearGradient>
            <HeaderBar></HeaderBar>
            <ScrollView style={styles.mainContainer} showsVerticalScrollIndicator={false} onMomentumScrollEnd={handleMomentumScrollEnd} scrollEventThrottle={1750}>
                <LinearGradient colors={["#ffffff", "#fff7f7", '#ebebeb', '#e3e3e3']} style={[styles.linearGradient, { borderRadius: scaleSizeW(10) }]}>
                </LinearGradient>
                <FuncBlock></FuncBlock>
                <AdBanner></AdBanner>
                <RecommendList list={list}></RecommendList>
            </ScrollView>
        </View >

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
        marginBottom: 0,
        backgroundColor: "#e3e3e3",
        borderTopLeftRadius: scaleSizeW(10),
        borderTopRightRadius: scaleSizeW(10),
    }
})

export default Home
