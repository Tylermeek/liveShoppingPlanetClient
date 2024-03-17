import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { scaleSizeW } from "utlis/scaleSize";

export default function SectionHeader({ item }: any) {
  const { rootCateData } = useAppSelector((state) => state.catalog);
  const [name, setName] = useState("");
  useEffect(() => {
    setName(
      rootCateData.find((cate) => cate.id === item.section.id)?.name || ""
    );
  }, [rootCateData]);
  return (
    <View
      style={{
        height: scaleSizeW(40),
        backgroundColor: "white",
        paddingTop: 10,
        paddingLeft: 24,
        paddingBottom: 15,
      }}
    >
      <Text
        style={{ fontSize: 12, color: "#808080" }}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {name}
      </Text>
    </View>
  );
}
