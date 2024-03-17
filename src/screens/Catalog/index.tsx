import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar, View } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import { getCateDateThunk, getRootCateDateThunk } from "slice/catalog";
import { useAppDispatch } from "store/hooks";
import CategoryContentList from "./components/CategoryContentList";

export default function Playground() {
  const dispatch = useAppDispatch();
  const [sectionListRef, setSectionListRef] = useState(null);
  const [flatListRef, setFlatListRef] = useState(null);
  useEffect(() => {
    dispatch(getCateDateThunk());
    dispatch(getRootCateDateThunk());
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={[
          {
            flex: 1,
            flexDirection: "row",
          },
        ]}
      >
        <CategoryList
          rootEndReached={() => {}}
          itemOnPress={(item: any, sectionIndex: any, index: any) =>
            console.log(`点击了第${sectionIndex}组中的第${index}个商品`)
          }
          needScrollTo
          sectionListRef={sectionListRef}
          onSetFlatListRef={setFlatListRef}
          flatListRef={flatListRef}
          // onCateEndReached={() => {}}
        />
        <CategoryContentList
          needScrollTo
          onSetSectionListRef={setSectionListRef}
          flatListRef={flatListRef}
        />
      </View>
    </GestureHandlerRootView>
  );
}
