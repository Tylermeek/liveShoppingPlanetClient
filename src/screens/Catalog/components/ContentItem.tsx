import { View, Text, Dimensions } from "react-native";
import React from "react";
import { scaleSizeW } from "utlis/scaleSize";
import { useAppSelector } from "store/hooks";
import CellItem from "./CellItem";

export default function ContentItem({ needScrollTo, item }: any) {
  const sHeight = Dimensions.get("screen").height;
  const cateDataLen = useAppSelector((state) => state.catalog.cateData.length);
    // console.log(item.section.rootIndex === 0 && item);
  // console.log(item.id);
  

  return item.index === 0 ? (
    <>
      <View
        key={item.index}
        style={{
          paddingLeft: 24,
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {item.section.data.map((cell: any, index: any) => (
          <CellItem
            key={index}
            rootId={item.item.pid}
            item={cell}
            sectionIndex={item.section.rootIndex}
            index={index}
          />
        ))}
      </View>
      {needScrollTo && (
        <>
          {
            item?.section?.rootIndex !== cateDataLen - 1 ? (
              <View style={{ height: 1, backgroundColor: "#efefef" }} />
            ) : (
              <View
                style={{
                  height:
                    sHeight -
                    (Math.ceil(item?.section?.data?.length / 3) *
                      scaleSizeW(120) +
                      scaleSizeW(40)) -
                    scaleSizeW(40),
                }}
              />
            ) //最后一个菜单的空白占位
          }
        </>
      )}
    </>
  ) : null;
}
