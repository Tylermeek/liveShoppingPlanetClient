import { SearchBar } from "@rneui/themed";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeW, scaleSizeH } from "utlis/scaleSize";
import { useNavigation } from "@react-navigation/native";
import Search from "components/Search";
import { Views } from "types/navigation";


const FakeSearchBanner: React.FC = () => {
    const navigation = useNavigation();

    const toSearch = () => {
        navigation.navigate(Views.SearchDetail)
    }

    return <>
        <TouchableOpacity
            onPress={toSearch}
            activeOpacity={1}
        >
            <Search editable={false} ></Search>
        </TouchableOpacity>
    </>
}

const styles = StyleSheet.create({

})

export default FakeSearchBanner
