import FakeSearchBanner from "screens/Home/componets/FakeSearchBanner";
import Camera from "components/Camera";
import MessageBox from "components/MessageBox";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

type HeaderBarProps = {
}

const HeaderBar: React.FC<HeaderBarProps> = () => {
    
    
    return <>
        <View style={styles.container}>
            <Camera></Camera>
            <FakeSearchBanner></FakeSearchBanner>
            <MessageBox></MessageBox>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        width: scaleSizeW(375),
        height: scaleSizeH(52),
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: scaleSizeH(0.5)
    },
})

export default HeaderBar
