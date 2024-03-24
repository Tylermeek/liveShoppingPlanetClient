import { useIsFocused, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { RootRouteType, Views } from "types/navigation";
import * as Progress from "react-native-progress";
import Header from "./components/Header";
import Bottom from "./components/Bottom";
import { scaleSizeW } from "utlis/scaleSize";

const LiveRoom: React.FC = () => {
  const route = useRoute<RootRouteType<Views.LiveRoom>>();
  const liveRoom = useRef<Video>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = route.params?.userId;
  const userName = route.params?.userName;
  const liveInfo = route.params.liveInfo;
  const isFocused = useIsFocused();

  async function startVideo() {
    // console.log(liveRoom.current);

    if (liveRoom.current) {
      try {
        await liveRoom.current.unloadAsync();
        await liveRoom.current.loadAsync(
          { uri: "http://192.168.1.101:8082/live/livestream.m3u8" },
          {},
          false
        );
        await liveRoom.current.playAsync();
      } catch (error) {
        console.warn(error);
      }
    }
  }

  useEffect(() => {
    console.log(isFocused);

    if (!isFocused) {
      // delVideo();
    } else {
      startVideo();
      console.log("start");
    }
  }, [isFocused]);

  const handlePlayStatusChange = (status: any) => {
    console.log(status);
    if (status.isBuffering && !loading) {
      setLoading(true);
      console.log(status);
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "grey",
        }}
      >
        {liveInfo && (
          <>
            <Video
              style={{
                width: "100%",
                height: "100%",
                // backgroundColor:"white"
              }}
              ref={liveRoom}
              resizeMode={ResizeMode.COVER}
              source={{
                // uri: liveInfo.live_room.hls_url,
                uri: "http://192.168.1.104:8082/live/livestream.m3u8",
              }}
              shouldPlay
              isMuted
              // onPlaybackStatusUpdate={handlePlayStatusChange}
            />
            {!loading && (
              <Progress.Circle
                size={50}
                borderWidth={scaleSizeW(5)}
                indeterminate={true}
                color="#EC9A86"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: [{ translateX: scaleSizeW(-30) }],
                }}
              />
            )}
            <Header />
            {/* <Bottom /> */}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default LiveRoom;
