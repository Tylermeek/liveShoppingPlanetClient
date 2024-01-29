import { useIsFocused } from "@react-navigation/native";
import { Image, Text } from "@rneui/themed";
import { getLiveList, getLiveSwiperBanner } from "axios/api/live";
import { Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { LiveSwiperInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const Live: React.FC = () => {
    const containerWidth = Dimensions.get('window').width
    const containerHeight = Dimensions.get('window').height - scaleSizeH(40)
    const [liveList, setLiveList] = useState<any[]>([])
    const liveRoom = useRef<Video>();
    const [currentIndex, setCurrentIndex] = useState(0);
    const isFocused = useIsFocused();
    function handlePress(item: LiveSwiperInfo): void {
        // throw new Error("Function not implemented.");
        console.log(item.liveId);

    }

    const getList = async () => {
        const res = await getLiveList({ orderBy: 'desc', orderName: 'created_at' })
        setLiveList(res.data.rows)
    }

    async function delVideo() {
        if (liveRoom.current) {
            await liveRoom.current.unloadAsync();
        }
    }
    async function startVideo(index: number) {
        if (liveRoom.current) {
            await liveRoom.current.unloadAsync();
            await liveRoom.current.loadAsync(
                { uri: liveList[index].live_room.hls_url },
                {},
                false
            );
            await liveRoom.current.playAsync();
        }
    }

    async function handleOnSnapToItem(index: number) {
        setCurrentIndex(index);
    }

    useEffect(() => {
        if (!isFocused) {
            delVideo();
        } else {
            startVideo(currentIndex);
        }
    }, [isFocused]);

    useEffect(() => {
        // getLiveSwiperBanner()
        //     .then((res) => {
        //         setSwiperList(res.data)
        //     })

        // getList()
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
                    data={liveList}
                    scrollAnimationDuration={500}
                    renderItem={({ item, index }) => (
                        <Video
                            source={item.source}
                            // shouldPlay
                            useNativeControls
                            style={{ width: "100%", height: "100%", backgroundColor: "grey" }}
                        />
                    )}
                    onSnapToItem={(index) => handleOnSnapToItem(index)}
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
