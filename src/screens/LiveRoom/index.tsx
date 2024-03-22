import { useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootRouteType, Views } from "types/navigation";
import * as Progress from "react-native-progress";

const LiveRoom: React.FC = () => {
  const route = useRoute<RootRouteType<Views.LiveRoom>>();
  const liveRoom = useRef<any>(null);
  const animationRef = useRef<LottieView>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showGif, setshowGif] = useState(false);
  const userId = route.params?.userId;
  const userName = route.params?.userName;
  const liveInfo = route.params.liveInfo;

  const handlePlayStatusChange = (status: any) => {
    if (status.isBuffering && !loading) {
      setLoading(true);
      console.log(status);
    }
  };

  useEffect(() => {
    if (showGif) {
      animationRef.current?.play();
      setTimeout(() => {
        animationRef.current?.pause();
        setshowGif(false);
      }, 1500);
    }
  }, [showGif]);

  return (
    <>
      <View style={{ flex: 1, backgroundColor: "grey" }}>
        {userId && (
          <Text>
            直播间{userId}--{userName}
          </Text>
        )}
        {liveInfo && (
          <>
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
            {!loading && (
              <Progress.Circle size={30} indeterminate={true} color="#EC9A86" />
            )}
            {showGif && (
              <LottieView
                ref={animationRef}
                source={require("../../../assets/animation/love.json")}
                style={{ width: "100%", height: "100%" }}
                loop
              />
            )}
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({});

export default LiveRoom;
