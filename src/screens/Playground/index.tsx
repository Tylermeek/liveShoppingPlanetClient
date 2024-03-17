import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";

export default function Playground() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
          },
        ]}
      ></View>
    </GestureHandlerRootView>
  );
}
