import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";
import LottieView from "lottie-react-native";
import { Button, Image } from "@rneui/themed";
interface FormData {
  mobile: string;
  code: string;
  password: string;
  secPass: string;
}

export default function Gift() {
  const animationRef = useRef<LottieView>(null);
  const [showGif, setshowGif] = useState(false);

  useEffect(() => {
    if (showGif) {
      animationRef.current?.play();
      setTimeout(() => {
        animationRef.current?.pause();
        setshowGif(false);
      }, 2500);
    }
  }, [showGif]);
  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View
          style={{
            borderRadius: scaleSizeW(15),
            overflow: "hidden",
            // height: scaleSizeW(100),
            width: scaleSizeW(80),
            margin: StatusBar.currentHeight,
          }}
        >
          <Image
            style={{ height: scaleSizeW(80), width: scaleSizeW(80) }}
            source={require("../../../assets/animationCover/love.png")}
          />
          <Button
            title="赠送"
            radius="md"
            onPress={() => setshowGif(true)}
            buttonStyle={{
              padding: scaleSizeW(2),
            }}
            containerStyle={{
              margin: scaleSizeW(5),
            }}
            titleStyle={{
              fontSize: scaleSizeW(11),
            }}
          />
        </View>
        {showGif && (
          <View
            style={{
              paddingTop: StatusBar.currentHeight,
              paddingLeft: scaleSizeW(40),
              paddingRight: scaleSizeW(40),
            }}
          >
            <LottieView
              ref={animationRef}
              source={require("../../../assets/animation/love.json")}
              style={{ width: "100%", height: "100%" }}
              loop
              // autoPlay
            />
          </View>
        )}
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: scaleSizeW(10),
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: scaleSizeW(15),
    paddingLeft: scaleSizeW(10),
    paddingVertical: scaleSizeW(10),
    borderBottomWidth: 1,
    borderRadius: 10,
  },
});
