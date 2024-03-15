import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Image, Text } from "@rneui/themed";
import { getLiveList, getLiveSwiperBanner } from "axios/api/live";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ImageBackground, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { LiveSwiperInfo } from "types/info";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import LiveTitle from "./components/LiveTitle";
import { Views } from "types/navigation";

const Live: React.FC = () => {
    const containerWidth = Dimensions.get('window').width
    const [containerHeight, setContainerHeight] = useState<number>(1)
    const [liveList, setLiveList] = useState<any[]>([])
    const liveRoom = useRef<any>(null);
    const warp = useRef<any>(null);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const isFocused = useIsFocused();
    const navigation = useNavigation()


    function handlePress(item: LiveSwiperInfo): void {
        // throw new Error("Function not implemented.");
        console.log(item.liveId);

    }

    const getList = async () => {
        // test data

        const test = {
            "nowPage": 1,
            "pageSize": 2,
            "hasMore": false,
            "total": 2,
            "rows": [
                {
                    "id": 19,
                    "socket_id": "-1",
                    "live_room_id": 4,
                    "user_id": 4,
                    "track_video": 1,
                    "track_audio": 1,
                    "srs_server_id": "vid-2tnrduc",
                    "srs_service_id": "7lp86091",
                    "srs_action": "on_publish",
                    "srs_client_id": "1n0cz1dj",
                    "srs_ip": "172.17.0.1",
                    "srs_vhost": "__defaultVhost__",
                    "srs_app": "livestream",
                    "srs_tcUrl": "rtmp://192.168.10.10:1935/livestream",
                    "srs_stream": "roomId___4",
                    "srs_param": "?pushkey=9e6b0dfddcfd0e0989ef61e38c8f8cdc",
                    "srs_stream_url": "/livestream/roomId___4",
                    "srs_stream_id": "vid-1b44917",
                    "created_at": "2024-01-30 00:30:25",
                    "updated_at": "2024-01-30 00:30:25",
                    "deleted_at": null,
                    "live_room_weight": 20,
                    "user": {
                        "id": 4,
                        "username": "MoonTIT",
                        "status": 0,
                        "avatar": "https://resource.hsslive.cn/billd-live/image/2b045c7f02febd23893244e923115535.webp",
                        "desc": "这个人很懒，什么也没有留下",
                        "created_at": "2024-01-07 19:30:45",
                        "updated_at": "2024-01-07 19:30:45",
                        "deleted_at": null
                    },
                    "live_room": {
                        "id": 4,
                        "name": "房东的猫-少年锦时",
                        "desc": "房东的猫livehouse合集",
                        "status": 0,
                        "is_show": 0,
                        "remark": null,
                        "type": 0,
                        "pull_is_should_auth": 1,
                        "cdn": 1,
                        "weight": 20,
                        "cover_img": "data:image/webp;base64,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",
                        "bg_img": null,
                        "rtmp_url": "rtmp://192.168.10.10/livestream/roomId___4",
                        "flv_url": "http://192.168.10.10:5001/livestream/roomId___4.flv",
                        "hls_url": "http://192.168.10.10:5001/livestream/roomId___4.m3u8",
                        "created_at": "2024-01-07 19:30:45",
                        "updated_at": "2024-01-30 00:30:23",
                        "deleted_at": null,
                        "areas": [
                            {
                                "id": 1,
                                "name": "音乐",
                                "weight": 10,
                                "remark": "音乐分区",
                                "created_at": "2024-01-07 19:30:46",
                                "updated_at": "2024-01-07 19:30:46",
                                "deleted_at": null
                            }
                        ]
                    }
                },
                {
                    "id": 18,
                    "socket_id": "-1",
                    "live_room_id": 3,
                    "user_id": 3,
                    "track_video": 1,
                    "track_audio": 1,
                    "srs_server_id": "vid-2tnrduc",
                    "srs_service_id": "7lp86091",
                    "srs_action": "on_publish",
                    "srs_client_id": "xv024b8u",
                    "srs_ip": "172.17.0.1",
                    "srs_vhost": "__defaultVhost__",
                    "srs_app": "livestream",
                    "srs_tcUrl": "rtmp://192.168.10.10:1935/livestream",
                    "srs_stream": "roomId___3",
                    "srs_param": "?pushkey=fe09b8a4a731cdba15f364c3e1d74517",
                    "srs_stream_url": "/livestream/roomId___3",
                    "srs_stream_id": "vid-vr906dg",
                    "created_at": "2024-01-30 00:30:25",
                    "updated_at": "2024-01-30 00:30:25",
                    "deleted_at": null,
                    "live_room_weight": 3,
                    "user": {
                        "id": 3,
                        "username": "Dukoo",
                        "status": 0,
                        "avatar": "https://resource.hsslive.cn/billd-live/image/752a40d44811c99278961410da656464.webp",
                        "desc": "这个人很懒，什么也没有留下",
                        "created_at": "2024-01-07 19:30:45",
                        "updated_at": "2024-01-07 19:30:45",
                        "deleted_at": null
                    },
                    "live_room": {
                        "id": 3,
                        "name": "房东的猫-和宇宙的温柔关联",
                        "desc": "房东的猫livehouse合集",
                        "status": 0,
                        "is_show": 0,
                        "remark": null,
                        "type": 0,
                        "pull_is_should_auth": 0,
                        "cdn": 1,
                        "weight": 3,
                        "cover_img": "data:image/webp;base64,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",
                        "bg_img": null,
                        "rtmp_url": "rtmp://192.168.10.10/livestream/roomId___3",
                        "flv_url": "http://192.168.10.10:5001/livestream/roomId___3.flv",
                        "hls_url": "http://192.168.10.10:5001/livestream/roomId___3.m3u8",
                        "created_at": "2024-01-07 19:30:45",
                        "updated_at": "2024-01-30 00:30:23",
                        "deleted_at": null,
                        "areas": [
                            {
                                "id": 1,
                                "name": "音乐",
                                "weight": 10,
                                "remark": "音乐分区",
                                "created_at": "2024-01-07 19:30:46",
                                "updated_at": "2024-01-07 19:30:46",
                                "deleted_at": null
                            }
                        ]
                    }
                }
            ]
        }

        setLiveList(test.rows)



        // const res = await getLiveList({ orderBy: 'desc', orderName: 'created_at' })
        // setLiveList(res.data.rows)
    }

    async function delVideo() {
        if (liveRoom.current) {
            await liveRoom.current.unloadAsync();
        }
    }
    async function startVideo(index: number) {
        // console.log(liveRoom, index);

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
        // console.log(index);

        setCurrentIndex(index);
    }

    const handleEnterLive = (liveInfo: any) => {
        // console.log(liveInfo.id);
        navigation.navigate(Views.LiveRoom, { liveInfo })
    }

    useEffect(() => {
        // console.log(isFocused);

        if (!isFocused) {
            delVideo();
        } else {
            startVideo(currentIndex);
        }
    }, [isFocused]);

    useEffect(() => {
        // console.log(liveList);

    }, [liveList])

    useEffect(() => {
        // getLiveSwiperBanner()
        //     .then((res) => {
        //         setSwiperList(res.data)
        //     })

        getList()

    }, [])



    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                    // backgroundColor: 'red',
                }}
                ref={warp}
                onLayout={() => {
                    warp.current.measure((x: any, y: any, w: any, h: React.SetStateAction<number>) => {
                        setContainerHeight(h);
                    });
                }}
            >
                <Carousel
                    width={containerWidth}
                    height={containerHeight}
                    vertical
                    autoPlay={false}
                    pagingEnabled={false}
                    data={liveList}
                    scrollAnimationDuration={500}
                    renderItem={({ item, index }) => (
                        <View
                            style={{
                                flex: 1,
                            }}>
                            <ImageBackground
                                source={{ uri: liveList[currentIndex].live_room.cover_img }}
                                resizeMode={ResizeMode.COVER}
                                style={{
                                    width: containerWidth,
                                    height: containerHeight,
                                    position: 'absolute',
                                }}
                                blurRadius={5}
                            />
                            {
                                currentIndex === index
                                &&
                                <Video
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                    }}
                                    ref={liveRoom}
                                    resizeMode={ResizeMode.CONTAIN}
                                    source={{
                                        uri: liveList[currentIndex].live_room.hls_url,
                                    }}
                                    shouldPlay
                                    // useNativeControls
                                    isMuted
                                />

                            }
                            <View
                                style={[styles.liveEnterWarp, { height: containerHeight, width: containerWidth, backgroundColor: "transparent" }]}>
                                <Button
                                    title={"点击进入直播间"}
                                    color={"rgba(217, 217, 217,0.5)"}
                                    radius={"lg"}
                                    buttonStyle={{ paddingVertical: scaleSizeW(10), paddingHorizontal: scaleSizeH(20) }}
                                    titleStyle={{ fontSize: scaleSizeW(17), fontWeight: "bold" }}
                                    onPress={() => handleEnterLive(liveList[currentIndex])}
                                />
                                <LiveTitle liveTitle={liveList[currentIndex].live_room.name} liveUser={liveList[currentIndex].user.username} />
                            </View>

                        </View>
                    )}
                    onSnapToItem={(index) => handleOnSnapToItem(index)}
                />
            </View>


        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    live: {
        height: scaleSizeH(200),
        marginBottom: scaleSizeH(10)
    },
    liveEnterWarp: {
        position: "absolute",
        top: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        flex: 1,
        height: '100%',
        alignItems: 'center',
    }

})

export default Live
