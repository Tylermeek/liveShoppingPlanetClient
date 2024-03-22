import { View, Text, SectionList, StatusBar, Dimensions } from "react-native";
import React from "react";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  updateIsScroll,
  updateRootSelItem,
  updateSelectedRootCate,
} from "slice/catalog";
import ContentItem from "./ContentItem";
import SectionHeader from "./SectionHeader";
import { scaleSizeW } from "utlis/scaleSize";
import { useVirtualList } from "ahooks";

export default function CategoryContentList({
  needScrollTo,
  onSetSectionListRef,
  flatListRef,
}: any) {
  const dispatch = useAppDispatch();
  const cateData = useAppSelector(
    (state) => state.catalog.cateData
  );
  const isScroll = useAppSelector(
    (state) => state.catalog.isScroll
  );
  const rootCateDataLen = useAppSelector(
    (state) => state.catalog.rootCateData.length
  );
  const sHeight = Dimensions.get("window").height;

  const scrollRootSel = (e: any) => {
    //右边菜单滚动时左边菜单跳到相应选项
    let currentIndex = e?.viewableItems[0]?.section?.rootIndex;
    if (isScroll) {
      dispatch(updateSelectedRootCate(currentIndex));
      dispatch(updateRootSelItem(cateData[currentIndex]));
      (rootCateDataLen- currentIndex) * scaleSizeW(44) >
      sHeight - scaleSizeW(110)
        ? flatListRef.scrollToOffset({
            animated: true,
            offset: currentIndex * scaleSizeW(44),
          })
        : null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: StatusBar.currentHeight,
      }}
    >
      <SectionList
        ref={(ref) => onSetSectionListRef(ref)}
        renderSectionHeader={(item) => <SectionHeader item={item} />}
        renderItem={(item) => (
          <ContentItem item={item} needScrollTo={needScrollTo} />
        )}
        sections={cateData}
        // ListEmptyComponent={<DefaultPage style={{ height: 200 }} />}
        ItemSeparatorComponent={() => <View />}
        ListHeaderComponent={() => <View />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => "key" + index + item}
        // onEndReached={() => onCateEndReached && onCateEndReached()}
        onViewableItemsChanged={(e) => {
          //   console.log(e);
          needScrollTo && scrollRootSel(e);
        }}
        onScrollBeginDrag={() => {
          dispatch(updateIsScroll(true));
        }}
        onScrollAnimationEnd={() => {
          dispatch(updateIsScroll(false));
        }}
      />
    </View>
  );
}
