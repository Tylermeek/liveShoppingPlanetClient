import { View } from "react-native";
import React from "react";
import { ISearchGood } from "types/search";
import { scaleSizeW } from "utlis/scaleSize";
import { Image, Text } from "@rneui/themed";
import RowFlexConatiner from "components/RowFlexContainer";

export default function GoodCard({ good }: { good: ISearchGood }) {
  return (
    <View
      style={{
        margin: scaleSizeW(10),
        padding: scaleSizeW(10),
        backgroundColor: "white",
        borderRadius: scaleSizeW(10),
      }}
    >
      <RowFlexConatiner>
        <Image
          source={{ uri: good.picUrl }}
          style={{ width: scaleSizeW(100), height: scaleSizeW(100) }}
        />
        <View>
          <Text h2>{good.name}</Text>
          <Text h4 style={{ marginTop: scaleSizeW(10) }}>
            {good.brief}
          </Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text h3 style={{ color: "red" }}>
            ￥{good.retailPrice}
          </Text>
          <Text
            style={{
              fontSize: scaleSizeW(10),
              color: "grey",
              textDecorationLine: "line-through",
            }}
          >
            ￥{good.counterPrice}
          </Text>
        </View>
      </RowFlexConatiner>
    </View>
  );
}
