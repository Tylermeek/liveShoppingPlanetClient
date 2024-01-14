import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";

type SearchProps = {
    serachContent: string
    editable?: boolean
    updateSearchCb: (serachContent:string) => void
}

const Search: React.FC<SearchProps> = ({ serachContent, editable = true, updateSearchCb }) => {
    return <>
        <SearchBar
            value={serachContent}
            onChangeText={updateSearchCb}
            placeholder="搜你想搜"
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            editable={editable}
        >
        </SearchBar>
    </>
}

const styles = StyleSheet.create({
    searchContainer: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        fontSize: 12,
        backgroundColor: "yellow",
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        padding: 0
    },
    searchInput: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        backgroundColor: "rgba(218, 218, 218, 1)",
        borderRadius: 15,
    }
})

export default Search
