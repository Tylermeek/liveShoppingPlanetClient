import { ListItem } from "@rneui/themed";
import { getSearchSuggestions, SuggestionsList } from "axios/api/search";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import Search from "components/Search";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { debounce, uniqueId } from "lodash-es"
import SuggestionList from "./components/SuggestionList";
import SearchHistory from "./components/SearchHistory";
import SearchRecommend from "./components/SearchRecommend";

const SearchDetail: React.FC = () => {
    const [searchRef, setSearchRef] = useState<any>(null)
    const [search, setSearch] = useState<string>("")
    const [suggestionList, setSuggestionList] = useState<SuggestionsList>([])
    const updateSearch = debounce((search: string) => {
        setSearch(search)
        getSuggestionsList(search)
    })

    const getSuggestionsList = debounce((search: string) => {

        getSearchSuggestions(search)
            .then((res) => {
                setSuggestionList(res.data)
            })
            .catch((err) => {
                console.error(err);

            })
    }, 200)

    const bindRef = (ref: any) => {
        setSearchRef(ref)
    }

    useEffect(() => {
        // 避免组件没有完全渲染成功，无法调用键盘
        setTimeout(() => {
            searchRef && searchRef?.focus()
        }, 50)
    })

    return <>
        <View style={styles.searchBanner}>
            <GoBack></GoBack>
            <Search bindRef={bindRef} searchContent={search} editable={true} updateSearchCb={updateSearch}></Search>
            <Camera></Camera>
        </View>
        {
            Array.isArray(suggestionList) && suggestionList.length !== 0
                ? <SuggestionList suggestionList={suggestionList}></SuggestionList>
                :
                <View style={styles.searchContainer}>
                    <SearchHistory></SearchHistory>
                    <SearchRecommend></SearchRecommend>
                </View>


        }

    </>
}

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
        marginTop: StatusBar.currentHeight
    },
    searchContainer:{
        height:"100%",
        backgroundColor:"white",
    }
})

export default SearchDetail
