import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CardContainer from "./CardContainer";
import { SearchRecommendList, getSearchRecommend } from "axios/api/search";
import { isEmptyArr } from "utlis/method";



const SearchRecommend: React.FC = () => {

    const [contentList, setContentList] = useState<SearchRecommendList>([])

    useEffect(() => {
        getSearchRecommend()
            .then((res) => {
                setContentList(res.data)
            })
    }, [])
    return <>
        {
            isEmptyArr(contentList) &&
            <CardContainer title="猜你想搜" contentList={contentList}></CardContainer>
        }
    </>
}

const styles = StyleSheet.create({
})

export default SearchRecommend