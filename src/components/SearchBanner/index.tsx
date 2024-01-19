import { useRoute } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { SearchResultList } from "axios/api/search";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import Search, { SearchProps } from "components/Search";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { RootRouteType, Views } from "types/config";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";

export interface SearchBannerProps {
    LeftIcon: React.FC<{}>
    RightIcon: React.FC<{}>
    searchProps: SearchProps
}

const SearchBanner: React.FC<SearchBannerProps> = ({ LeftIcon, RightIcon, searchProps }) => {
    return <>
        <View style={styles.searchBanner}>
            <LeftIcon></LeftIcon>
            <Search {...searchProps}></Search>
            <RightIcon></RightIcon>
        </View>
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

export default SearchBanner
