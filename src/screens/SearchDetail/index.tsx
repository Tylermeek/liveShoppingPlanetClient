import { getSearchSuggesttion } from "axios/api/search";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import Search from "components/Search";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import SuggestionList from "./components/SuggestionList";
import SearchHistory from "./components/SearchHistory";
import SearchRecommend from "./components/SearchRecommend";
import SearchBanner from "components/SearchBanner";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRequest } from "ahooks";
import { SuggestionsList } from "types/search";
import { isEmptyArr } from "utlis/method";

const SearchDetail: React.FC = () => {
  const [searchRef, setSearchRef] = useState<any>(null);
  const [keyword, setKeyword] = useState("");
  const [suggestionList, setSuggestionList] = useState<SuggestionsList>([]);
  const { run, loading } = useRequest(
    () => {
      return getSearchSuggesttion(keyword);
    },
    {
      debounceMaxWait: 500,
      refreshDeps: [keyword],
      onSuccess: (res) => {
        setSuggestionList(res.data);
      },
    }
  );

  useEffect(() => {
    // 避免组件没有完全渲染成功，无法调用键盘
    setTimeout(() => {
      searchRef && searchRef?.focus();
    }, 50);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchBanner
        LeftIcon={GoBack}
        RightIcon={Camera}
        searchProps={{
          bindRef: setSearchRef,
          editable: true,
          // todo 检查是否可以正常渲染
          updateSearchCb: (keyword) => {
            console.log(keyword);
            setKeyword(keyword);
          },
        }}
      />

      {/* {isEmptyArr(suggestionList) ? (
        <SuggestionList suggestionList={suggestionList}></SuggestionList>
      ) : (
        <View style={styles.searchContainer}>
          <SearchHistory></SearchHistory>
          <SearchRecommend></SearchRecommend>
        </View>
      )} */}
      <SuggestionList suggestionList={suggestionList}></SuggestionList>
      <View style={styles.searchContainer}>
        <SearchHistory></SearchHistory>
        <SearchRecommend></SearchRecommend>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  searchBanner: {
    width: scaleSizeW(375),
    height: scaleSizeH(52),
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: scaleSizeH(0.5),
    marginTop: StatusBar.currentHeight,
  },
  searchContainer: {
    height: "100%",
    backgroundColor: "white",
  },
});

export default SearchDetail;
