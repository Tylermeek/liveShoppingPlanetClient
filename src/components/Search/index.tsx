import { SearchBar, Button, SearchBarProps } from "@rneui/themed";
import React, { PropsWithChildren, Ref, RefAttributes, RefObject, useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";

type SearchProps = {
    searchContent: string
    editable?: boolean
    placeholder?: string
    bindRef?: Function
    updateSearchCb: (serachContent: string) => void
}


const Search: React.FC<SearchProps> = (
    {
        searchContent,
        editable = true,
        placeholder = "搜你想搜",
        bindRef,
        updateSearchCb
    }) => {
    return <>
        <View style={styles.container}>
            <SearchBar
                value={searchContent}
                ref={(ref:any) => { bindRef && bindRef(ref) }}
                onChangeText={updateSearchCb}
                editable={editable}
                placeholder={placeholder}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInput}
                inputStyle={{ fontSize: scaleSizeH(12) }}
            >
            </SearchBar>
            {
                editable && searchContent &&
                <Button
                    title="搜索"
                    size="sm"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={{ height: scaleSizeH(25) }}
                    titleStyle={{ fontSize: scaleSizeH(10) }}
                    radius="sm"
                ></Button>
            }
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        position: "relative"
    },
    searchContainer: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        backgroundColor: "yellow",
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: 15,
        padding: 0,
    },
    searchInput: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        fontSize: scaleSizeH(8),
        backgroundColor: "rgba(218, 218, 218, 1)",
        borderRadius: 15,
    },
    buttonContainer: {
        width: scaleSizeW(45),
        position: "absolute",
        top: scaleSizeH(5),
        right: scaleSizeW(10)
    }
})

export default Search
