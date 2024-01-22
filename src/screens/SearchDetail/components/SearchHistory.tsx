import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CardContainer, { SearchCardType } from "./CardContainer";
import { SearchHistoryList, getSearchHistory } from "axios/api/search";
import { isEmptyArr } from "utlis/method";

const SearchHistory: React.FC = () => {
    // TODO 搜索历史删除功能
    const [contentList, setContentList] = useState<SearchHistoryList>([])
    const getList = () => {
        getSearchHistory()
            .then((res) => {
                setContentList(res.data)
            })
    }
    useEffect(() => {
        getList()
    }, [])
    return <>
        {
            !isEmptyArr(contentList) &&
            <CardContainer
                title="搜索历史"
                type={SearchCardType.SearchHistory}
                contentList={contentList}
                refreshList={getList}
            />
        }
    </>
}

const styles = StyleSheet.create({

})

export default SearchHistory
