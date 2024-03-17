import { View, Text, FlatList, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { ICategory } from "types/catalog";
import { useAppDispatch, useAppSelector } from "store/hooks";
import RootCategoryItem from "./RootCategoryItem";

interface IRootCategoryList {
  needScrollTo: boolean;
  sectionListRef: any;
  onSetFlatListRef:Function
  flatListRef:any
}

export default function RootCategoryList({
  needScrollTo,
  sectionListRef,
  onSetFlatListRef,
  flatListRef
}: IRootCategoryList) {
  const { rootCateData } = useAppSelector((state) => state.catalog);
  return (
    <View
      style={{
        backgroundColor: "#f5f5f5",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <FlatList
        ref={(ref) => onSetFlatListRef(ref)}
        data={rootCateData}
        ListHeaderComponent={() => <View />}
        ListFooterComponent={() => <View />}
        // ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#F5F5F5' }} />}
        renderItem={({ item, index }) => (
          <RootCategoryItem
            item={item}
            index={index}
            needScrollTo={needScrollTo}
            flatListRef={flatListRef}
            sectionListRef={sectionListRef}
          />
        )}
        onEndReachedThreshold={20}
        showsVerticalScrollIndicator={false}
        // onEndReached={() => <></>}
      />
    </View>
  );
}