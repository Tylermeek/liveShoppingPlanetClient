import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";
import { useNavigation } from "@react-navigation/native";
import Search from "components/Search";


const FakeSearchBanner: React.FC = () => {
    const navigation = useNavigation();

    const [search, setSearch] = useState<string>("")
    const updateSearch = (search: string) => {
        setSearch(search)
    }
    const toSearch = () => {
        navigation.navigate("SearchDetail")
    }

    return <>
        <TouchableOpacity
            onPress={toSearch}
            activeOpacity={1}
        >
            <Search serachContent={search} editable={false} updateSearchCb={updateSearch}></Search>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({

})

export default FakeSearchBanner
