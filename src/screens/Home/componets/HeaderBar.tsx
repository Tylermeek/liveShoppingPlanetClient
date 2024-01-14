import Search from "components/Search";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

type HeaderBarProps = {}

const HeaderBar: React.FC<HeaderBarProps> = () => {

    return <>
        <View style={styles.container}>
            <Search></Search>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: scaleSizeW(375),
        height: scaleSizeH(52),
        backgroundColor:"white",

    },
})

export default HeaderBar
