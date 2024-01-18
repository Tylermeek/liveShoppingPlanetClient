import FakeSearchBanner from "screens/Home/components/FakeSearchBanner";
import Camera from "components/Camera";
import MessageBox from "components/MessageBox";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
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
        margin: scaleSizeW(5),
        marginTop:StatusBar.currentHeight,
        height: scaleSizeH(45),
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: scaleSizeH(0.5),
        borderRadius: scaleSizeW(30)
    },
})

export default HeaderBar
