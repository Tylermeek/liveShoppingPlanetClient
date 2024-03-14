import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CardContainer, { SearchCardType } from "./CardContainer";
import { getSearchInitConten } from "axios/api/search";
import { isEmptyArr } from "utlis/method";
import { useRequest } from "ahooks";
import { HistoryKeywordList } from "types/search";

const SearchHistory: React.FC = () => {
  // TODO 搜索历史删除功能
  const [contentList, setContentList] = useState<HistoryKeywordList>([]);
  const { loading, refresh } = useRequest(getSearchInitConten, {
    onSuccess: (res) => setContentList(res.data.historyKeywordList),
  });

  return (
    <>
      {!isEmptyArr(contentList) && (
        <CardContainer
          title="搜索历史"
          type={SearchCardType.SearchHistory}
          contentList={contentList}
          refreshList={refresh}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchHistory;
