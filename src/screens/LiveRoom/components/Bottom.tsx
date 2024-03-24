import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Gift from "screens/Gift";
import { scaleSizeW } from "utlis/scaleSize";
import LikeButton from "./LikeButton";
import Animation from "components/Animation";

const likeAnimate = require("../../../../assets/animation/like.json");

export default function Bottom() {
  const [showGif, setShowGif] = useState(false);

  useEffect(() => {
    setShowGif(true);
  }, []);

  return (
    <View style={{ position: "absolute", bottom: 0, height: scaleSizeW(100) }}>
      <LikeButton />
      <Animation
        showGif={showGif}
        setshowGif={setShowGif}
        showGifSource={likeAnimate}
        animationStyle={{
          position: "absolute",
          top: -70,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "red",
        }}
        once={false}
      />
    </View>
  );
}
