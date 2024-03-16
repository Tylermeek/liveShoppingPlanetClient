import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import AdSwipper from "./AdSwipper";
import PromotionalActivity from "./PromotionalActivity";

const AdBanner: React.FC = () => {

    return <>
        <View style={{ height: scaleSizeH(200), margin: scaleSizeW(10),marginBottom:0, display: "flex", flexDirection: "row" }}>
            <AdSwipper></AdSwipper>
            <PromotionalActivity></PromotionalActivity>
        </View>
    </>
}

const styles = StyleSheet.create({

})

export default AdBanner
