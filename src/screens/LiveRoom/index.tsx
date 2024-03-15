import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootRouteType, Views } from "types/navigation";

const LiveRoom: React.FC = () => {
    const route = useRoute<RootRouteType<Views.LiveRoom>>()
    const liveRoom = useRef<any>(null);
    const [loading, setLoading] = useState<boolean>(false)
    
    const userId = route.params?.userId
    const userName = route.params?.userName
    const liveInfo = route.params.liveInfo

    const handlePlayStatusChange = (status: any) => {
        if (status.isBuffering && !loading) {
            setLoading(true)
            console.log(status);
        }
    }
    return <>
        <View style={{ flex: 1, backgroundColor: "grey" }}>
            {
                userId && <Text>LiveRoom{userId}--{userName}</Text>
            }
            {
                liveInfo && <>
                    <Video
                        style={{
                            width: "100%",
                            height: "19%",
                        }}
                        ref={liveRoom}
                        resizeMode={ResizeMode.CONTAIN}
                        source={{
                            uri: liveInfo.live_room.hls_url,
                        }}
                        shouldPlay
                        isMuted
                        // onPlaybackStatusUpdate={handlePlayStatusChange}
                    />
                    {!loading && <Text>loading</Text>}
                </>
            }
        </View>
    </>
}

const styles = StyleSheet.create({

})

export default LiveRoom
