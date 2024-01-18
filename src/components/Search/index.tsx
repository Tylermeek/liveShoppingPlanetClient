import { useNavigation } from "@react-navigation/native";
import { SearchBar, Button, SearchBarProps } from "@rneui/themed";
import React, { PropsWithChildren, Ref, RefAttributes, RefObject, useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import { Views } from "types/config";
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
    const navigation = useNavigation()


    const handlePress = (content: string) => {
        // getSearchResultList
        navigation.navigate(Views.SearchResultList, {
            content
        })
    }
    return <>
        <View style={styles.container}>
            <SearchBar
                value={searchContent}
                ref={(ref: any) => { bindRef && bindRef(ref) }}
                onChangeText={updateSearchCb}
                editable={editable}
                placeholder={placeholder}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInput}
                inputStyle={{ fontSize: scaleSizeH(12), color: "grey" }}
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
                    onPress={()=>handlePress(searchContent)}
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
        borderColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderRadius: scaleSizeW(35),
        borderWidth: 0,
        padding: 0,
    },
    searchInput: {
        width: scaleSizeW(270),
        height: scaleSizeH(35),
        fontSize: scaleSizeH(8),
        borderRadius: scaleSizeW(12),
    },
    buttonContainer: {
        width: scaleSizeW(45),
        position: "absolute",
        top: scaleSizeH(5),
        right: scaleSizeW(10)
    }
})

export default Search
