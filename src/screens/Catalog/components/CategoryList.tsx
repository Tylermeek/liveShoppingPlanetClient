import { View, Text } from "react-native";
import React from "react";
import RootCategoryList from "./RootCategoryList";

interface ICategoryListProps {
  rootEndReached: Function;
  itemOnPress: Function;
  needScrollTo: boolean;
  sectionListRef: any;
  flatListRef: any;
  onSetFlatListRef: Function;
}

export default function CategoryList({
  rootEndReached,
  itemOnPress,
  needScrollTo,
  flatListRef,
  sectionListRef,
  onSetFlatListRef,
}: ICategoryListProps) {
  return (
    <View>
      <RootCategoryList
        sectionListRef={sectionListRef}
        flatListRef={flatListRef}
        needScrollTo={needScrollTo}
        onSetFlatListRef={onSetFlatListRef}
      />
    </View>
  );
}
