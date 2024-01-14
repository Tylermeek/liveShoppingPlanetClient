import { useNavigation } from "@react-navigation/native";
import { Icon, Text } from "@rneui/base";
import { Button } from "@rneui/themed";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import Search from "components/Search";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const SearchDetail: React.FC = () => {
    const [search, setSearch] = useState<string>("")
    const updateSearch = (search: string) => {
        setSearch(search)
    }
    return <>
        <View style={styles.searchBanner}>
            <GoBack></GoBack>
            <Search serachContent={search} editable={true} updateSearchCb={updateSearch}></Search>
            <Camera></Camera>
        </View>
        <Text>{search}</Text>
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
