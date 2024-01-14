import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";


const Search: React.FC = () => {
    const [search, setSearch] = useState<string>("")

    const updateSearch = (search: string) => {
        setSearch(search)
    }

    return <>
        <SearchBar
            value={search}
            onChangeText={updateSearch}
            placeholder="搜你想搜"
            containerStyle={styles.searchContainer}
            inputContainerStyle={styles.searchInput}
            leftIcon
        >
        </SearchBar>
    </>
}

const styles = StyleSheet.create({
    searchContainer: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        top: scaleSizeH(8),
        left: scaleSizeW(53),
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
