import { View, Text } from "react-native";
import React, { useState } from "react";
import { Button, Icon } from "@rneui/base";
import { scaleSizeW } from "utlis/scaleSize";
import Animation from "./Animation";

const likeAnimate = require("../../../../assets/animation/like.json");

export default function LikeButton() {
  const [showGif, setShowGif] = useState(false);
  function handleLike(): void {}

  return (
    <View
      style={{
        marginTop: scaleSizeW(40),
        backgroundColor: "white",
        height: scaleSizeW(300),
      }}
    >
      <View
        style={{
          height: scaleSizeW(50),
          width: scaleSizeW(50),
          padding: scaleSizeW(10),
          borderRadius: scaleSizeW(60),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          name="favorite"
          color={"red"}
          size={30}
          onPress={() => setShowGif(true)}
        />
      </View>
      <Animation
        showGif={showGif}
        setshowGif={setShowGif}
        showGifSource={likeAnimate}
        animationStyle={{
          position: "absolute",
          top: -50,
          left: 0,
          height: scaleSizeW(50),
          width: scaleSizeW(50),
          backgroundColor:"red"
        }}
      />
    </View>
  );
}
