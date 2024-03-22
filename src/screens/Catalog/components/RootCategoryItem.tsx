import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useState } from "react";
import { ICategory } from "types/catalog";
import { scaleSizeW } from "utlis/scaleSize";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  updateIsScroll,
  updateRootSelItem,
  updateSelectedRootCate,
} from "slice/catalog";

interface IRootCategoryItemProps {
  item: ICategory;
  index: number;
  needScrollTo: boolean;
  flatListRef: any;
  sectionListRef: any;
}

export default function RootCategoryItem({
  item,
  index,
  needScrollTo,
  flatListRef,
  sectionListRef,
}: IRootCategoryItemProps) {
  // const { selectedRootCate, rootCateData } = useAppSelector(
  //   (state) => state.catalog
  // );
  const selectedRootCate = useAppSelector(
    (state) => state.catalog.selectedRootCate
  );
  const rootCateDatalen = useAppSelector(
    (state) => state.catalog.rootCateData.length
  );
  const dispatch = useAppDispatch();
  const sHeight = Dimensions.get("window").height;
  function handlePress(): void {
    setTimeout(() => {
      // todo sh 320
      (rootCateDatalen - index) * scaleSizeW(44) >
      sHeight - scaleSizeW(40) - scaleSizeW(44)
        ? flatListRef.scrollToOffset({
            animated: true,
            offset: index * scaleSizeW(20),
          })
        : null;
      sectionListRef &&
        sectionListRef.scrollToLocation({
          itemIndex: 0,
          sectionIndex: needScrollTo ? index : 0,
          animated: true,
          viewOffset: 0,
        });
    }, 100);
    dispatch(updateSelectedRootCate(index));
    dispatch(updateRootSelItem(item));
    dispatch(updateIsScroll(false));
  }

  return (
    <View style={{ position: "relative" }}>
      {selectedRootCate !== index && (
        <View
          style={{
            width: scaleSizeW(86),
            height: scaleSizeW(44),
            backgroundColor: "white",
            position: "absolute",
            zIndex: -1,
          }}
        />
      )}
      <TouchableOpacity
        key={index}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: scaleSizeW(86),
          height: scaleSizeW(44),
          borderTopRightRadius:
            index === selectedRootCate + 1 ? scaleSizeW(20) : 0,
          backgroundColor: index === selectedRootCate ? "white" : "#f5f5f5",
          borderBottomRightRadius:
            index === selectedRootCate - 1 ? scaleSizeW(20) : 0,
          borderTopLeftRadius: index === selectedRootCate ? scaleSizeW(20) : 0,
          borderBottomLeftRadius:
            index === selectedRootCate ? scaleSizeW(20) : 0,
        }}
        onPress={handlePress}
      >
        <Text
          style={{ fontSize: 14, color: "black" }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
