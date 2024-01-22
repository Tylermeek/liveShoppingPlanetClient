import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CardContainer, { SearchCardType } from "./CardContainer";
import { SearchRecommendList, getSearchRecommend } from "axios/api/search";
import { isEmptyArr } from "utlis/method";



const SearchRecommend: React.FC = () => {

    const [contentList, setContentList] = useState<SearchRecommendList>([])
    const getList = () => {
        getSearchRecommend()
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
                title="猜你想搜"
                type={SearchCardType.SearchRecommend}
                contentList={contentList}
                refreshList={getList}
            />
        }
    </>
}

const styles = StyleSheet.create({
})

export default SearchRecommend