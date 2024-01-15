import { ListItem } from "@rneui/themed";
import { getSearchSuggestions, suggestionsList } from "axios/api/search";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import Search from "components/Search";
import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { debounce, uniqueId } from "lodash-es"

const SearchDetail: React.FC = () => {
    const [searchRef, setSearchRef] = useState<any>(null)
    const [search, setSearch] = useState<string>("")
    const [suggestionList, setSuggestionList] = useState<suggestionsList>([])
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
    }, 300)

    return <>
        <View style={styles.searchBanner}>
            <GoBack></GoBack>
            <Search searchContent={search} editable={true} updateSearchCb={updateSearch}></Search>
            <Camera></Camera>
        </View>
        {
            Array.isArray(suggestionList) && suggestionList.length !== 0
            && (
                suggestionList.map((suggestion) => {
                    return (
                        <ListItem bottomDivider key={uniqueId(suggestion)}>
                            <ListItem.Content>
                                <ListItem.Title>{suggestion}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                    )

                })
            )
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
})

export default SearchDetail
