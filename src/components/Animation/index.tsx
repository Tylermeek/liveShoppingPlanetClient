import { View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";

export default function Animation({
  showGif,
  setshowGif,
  showGifSource,
  animationStyle = {
    width: "100%",
    height: "100%",
    backgroundColor: "transparent",
    position: "absolute",
    zIndex: 999,
  },
  once = true,
}: {
  showGif: boolean;
  setshowGif: Function;
  showGifSource: any;
  once?: boolean;
  animationStyle?: StyleProp<ViewStyle>;
}) {
  const animationRef = useRef<LottieView>(null);

  useEffect(() => {
    if (showGif) {
      console.log("start");

      animationRef.current?.play();
    }
  }, [showGif]);

  const handleAnimationFinish = () => {
    if (once) {
      animationRef.current?.pause();
      setshowGif(false);
    }
  };

  return (
    showGif && (
      <LottieView
        ref={animationRef}
        source={showGifSource}
        style={animationStyle}
        autoPlay={false}
        loop={!once}
        onAnimationFinish={handleAnimationFinish}
      />
    )
  );
}
