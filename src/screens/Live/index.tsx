import { Image, Text } from "@rneui/themed";
import { getLiveSwiperBanner } from "axios/api/live";
import { Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { LiveSwiperInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const Live: React.FC = () => {
    const containerWidth = Dimensions.get('window').width
    const containerHeight = Dimensions.get('window').height -scaleSizeH(40)
    const [liveList, setLiveList] = useState<any[]>([])
    function handlePress(item: LiveSwiperInfo): void {
        // throw new Error("Function not implemented.");
        console.log(item.liveId);

    }
    const test1 = require("../../../assets/test1.mp4")
    const test2 = require("../../../assets/test2.mp4")
    const test3 = require("../../../assets/test3.mp4")
    const test4 = require("../../../assets/test4.mp4")

    useEffect(() => {
        // getLiveSwiperBanner()
        //     .then((res) => {
        //         setSwiperList(res.data)
        //     })
        setLiveList([
            {
                source: test1,
                cover: "https://source.unsplash.com/random?sig=1"
            },
            {
                source: test2,
                cover: "https://source.unsplash.com/random?sig=2"
            },
            {
                source: test3,
                cover: "https://source.unsplash.com/random?sig=3"
            },
            {
                source: test4,
                cover: "https://source.unsplash.com/random?sig=4"
            },
        ])
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <Carousel
                    width={containerWidth}
                    height={containerHeight}
                    vertical
                    autoPlay={false}
                    pagingEnabled={false}
                    snapEnabled
                    data={liveList}
                    scrollAnimationDuration={1500}
                    renderItem={({ item, index }) => (
                        <Video
                            source={item.source}
                            // shouldPlay
                            useNativeControls
                            style={{ width: "100%", height: "100%", backgroundColor: "grey" }}
                        />
                    )}
                />

            </ScrollView>

        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    live: {
        height: scaleSizeH(200),
        marginBottom: scaleSizeH(10)
    }
})

export default Live
