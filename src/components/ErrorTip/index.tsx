import { Text } from "@rneui/themed";
import React from "react";

export default function ErrorTip({ tip }: { tip: string }) {
  return (
    <Text h4 style={{ color: "red" }}>
      {tip}
    </Text>
  );
}
