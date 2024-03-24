import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Button, Icon } from "@rneui/base";
import { scaleSizeW } from "utlis/scaleSize";
import Animation from "components/Animation";


export default function LikeButton() {
  const [showGif, setShowGif] = useState(false);
  function handleLike(): void {}

  return (
    <View
      style={{
        marginTop: scaleSizeW(40),
      }}
    >
      <TouchableOpacity
        style={{
          height: scaleSizeW(50),
          width: scaleSizeW(50),
          padding: scaleSizeW(10),
          borderRadius: scaleSizeW(60),
          backgroundColor: "white",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => setShowGif(true)}
      >
        <Icon name="favorite" color={"red"} size={30} />
      </TouchableOpacity>
    </View>
  );
}
