import { Image, Text } from "@rneui/themed";
import { getLiveSwiperBanner } from "axios/api/live";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { LiveSwiperInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import LivingFollowingList from "./LivingFollowingList";

const Live: React.FC = () => {
    const containerWidth = Dimensions.get('window').width
    const containerHeight = Dimensions.get('window').height
    const [swiperList, setSwiperList] = useState<LiveSwiperInfo[]>([])
    function handlePress(item: LiveSwiperInfo): void {
        // throw new Error("Function not implemented.");
        console.log(item.liveId);

    }

    useEffect(() => {
        getLiveSwiperBanner()
            .then((res) => {
                setSwiperList(res.data)
            })
    }, [])

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <ScrollView style={{ flex: 1 }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Carousel
                        loop
                        width={containerWidth}
                        height={containerHeight}
                        vertical
                        autoPlay={false}
                        pagingEnabled={false}
                        snapEnabled
                        data={swiperList}
                        scrollAnimationDuration={1500}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity key={item.id} style={{ flex: 1 }} onPress={() => handlePress(item)}>
                                <Image source={{ uri: item.image }} style={{ height: "100%", width: "100%" }}></Image>
                            </TouchableOpacity>
                        )}
                    />
                </GestureHandlerRootView>
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
