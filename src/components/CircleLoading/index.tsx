import React from "react";
import * as Progress from "react-native-progress";

export default function CircleLoading() {
  return (
    <Progress.Circle
      size={30}
      indeterminate={true}
      color="#EC9A86"
      style={{ position: "absolute", top: "50%", left: "50%" }}
    />
  );
}
