import { View, Text, ViewStyle, StyleProp } from "react-native";
import React, { ReactNode } from "react";

interface RowFlexConatinerProps {
  containerStyle?: StyleProp<ViewStyle>;
  children: ReactNode;
}

const RowFlexConatiner: React.FC<RowFlexConatinerProps> = ({
  containerStyle,
  children,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        ...(containerStyle as Object),
      }}
    >
      {children}
    </View>
  );
};

export default RowFlexConatiner;
