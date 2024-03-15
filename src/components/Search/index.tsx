import { useNavigation } from "@react-navigation/native";
import { SearchBar, Button, SearchBarProps } from "@rneui/themed";
import React, { PropsWithChildren, Ref, RefAttributes, RefObject, useState } from "react";
import { TextInput } from "react-native";
import { StyleSheet, View } from "react-native";
import { Views } from "types/navigation";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";

export type SearchProps = {
    initContent?: string
    editable?: boolean
    placeholder?: string
    bindRef?: Function
    updateSearchCb?: (serachContent: string) => void
    handlePressSearch?: Function
}


const Search: React.FC<SearchProps> = (
    {
        initContent = "",
        editable = true,
        placeholder = "搜你想搜",
        bindRef,
        updateSearchCb = () => { },
        handlePressSearch
    }) => {
    const [search, setSearch] = useState<string>(initContent)

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
                value={search}
                ref={(ref: any) => { bindRef && bindRef(ref) }}
                onChangeText={(newContent) => {
                    setSearch(newContent)
                    updateSearchCb(newContent)
                }}
                editable={editable}
                placeholder={placeholder}
                containerStyle={styles.searchContainer}
                inputContainerStyle={styles.searchInput}
                inputStyle={{ fontSize: scaleSizeH(12), color: "grey" }}
            >
            </SearchBar>
            {
                editable && search &&
                <Button
                    title="搜索"
                    size="sm"
                    containerStyle={styles.buttonContainer}
                    buttonStyle={{ height: scaleSizeH(25) }}
                    titleStyle={{ fontSize: scaleSizeH(10) }}
                    radius="sm"
                    onPress={() => handlePressSearch ? handlePressSearch(search) : handlePress(search)}
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
