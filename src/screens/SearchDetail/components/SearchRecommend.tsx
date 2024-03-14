import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CardContainer, { SearchCardType } from "./CardContainer";
import { getSearchInitConten } from "axios/api/search";
import { isEmptyArr } from "utlis/method";
import { useRequest } from "ahooks";
import { HotkeywordList } from "types/search";

const SearchRecommend: React.FC = () => {
  const [contentList, setContentList] = useState<HotkeywordList>([]);
  const { loading, refresh } = useRequest(getSearchInitConten, {
    onSuccess: (res) => {
      setContentList(res.data.hotKeywordList);
    },
  });

  return (
    <>
      {!isEmptyArr(contentList) && (
        <CardContainer
          title="猜你想搜"
          type={SearchCardType.SearchRecommend}
          contentList={contentList}
          refreshList={refresh}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchRecommend;
