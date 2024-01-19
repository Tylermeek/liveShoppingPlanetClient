import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CardContainer from "./CardContainer";
import { SearchHistoryList, getSearchHistory } from "axios/api/search";
import { isEmptyArr } from "utlis/method";

const SearchHistory: React.FC = () => {
    // TODO 搜索历史删除功能
    const [contentList, setContentList] = useState<SearchHistoryList>([])
    useEffect(() => {
        getSearchHistory()
            .then((res) => {
                setContentList(res.data)
            })
    }, [])
    return <>
        {
            !isEmptyArr(contentList) &&
            <CardContainer title="搜索历史" contentList={contentList}></CardContainer>
        }
    </>
}

const styles = StyleSheet.create({

})

export default SearchHistory
