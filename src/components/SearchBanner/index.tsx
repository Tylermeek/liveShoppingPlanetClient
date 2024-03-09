import Search, { SearchProps } from "components/Search";
import React from "react";
import { StatusBar, StyleSheet, View, ViewStyle } from "react-native";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";

export interface SearchBannerProps {
    LeftIcon: React.FC<{}>
    RightIcon: React.FC<{}>
    searchProps: SearchProps
    bannerStyle?: ViewStyle
}

const SearchBanner: React.FC<SearchBannerProps> = ({ LeftIcon, RightIcon, searchProps, bannerStyle = {} }) => {
    return <>
        <View style={[styles.searchBanner, bannerStyle]}>
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
        paddingTop: StatusBar.currentHeight
    },
})

export default SearchBanner
