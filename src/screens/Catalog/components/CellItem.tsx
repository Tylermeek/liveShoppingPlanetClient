import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { scaleSizeW } from "utlis/scaleSize";

export default function CellItem({
  item,
  sectionIndex,
  index,
  itemOnPress,
}: any) {
  //   index === 0 && console.log(item, sectionIndex, index, itemOnPress);

  return (
    <TouchableOpacity
      key={item?.id}
      style={[
        {
          height: scaleSizeW(120),
          alignItems: "center",
          justifyContent: "center",
          paddingRight: 24,
          paddingBottom: 15,
        },
      ]}
      onPress={() =>
        itemOnPress
          ? itemOnPress(item, sectionIndex, index)
          : console.log(`点击了第${sectionIndex}组中的第${index}个商品`)
      }
    >
      <Image
        style={{
          width: scaleSizeW(64),
          height: scaleSizeW(64),
        }}
        source={{
          uri:
            item?.picUrl ||
            "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.soutu123.cn%2Felement_origin_min_pic%2F01%2F40%2F65%2F61573d0bf6a3c2b.jpg%21%2Ffw%2F700%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.soutu123.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1CELL_WIDTH4982326&t=98f3ccdb6379042cROOT_WIDTH5e4e361ab8f591",
        }}
      />
      <Text
        style={[
          {
            fontSize: 14,
            color: "#4d4d4d",
            marginTop: 5,
            width: scaleSizeW(64),
            textAlign: "center",
          },
        ]}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {item?.name}
      </Text>
    </TouchableOpacity>
  );
}
