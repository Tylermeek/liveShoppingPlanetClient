import { Icon, Text } from "@rneui/themed";
import RowDivider from "components/RowDivider";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import RecommendList from "screens/Home/components/RecommendList";
import { handleMomentumScrollEnd } from "utlis/method";
import { scaleSizeW } from "utlis/scaleSize";

export default function Empty() {
    const [isEndReached, setIsEndReached] = useState<boolean>(false)
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            onScroll={(event) => handleMomentumScrollEnd(event, isEndReached, setIsEndReached)}
            scrollEventThrottle={50}
        >
            <View style={{
                justifyContent: "space-evenly",
                alignItems: "center",
                margin: scaleSizeW(10),
                padding: scaleSizeW(10),
                backgroundColor: "white",
                borderRadius:scaleSizeW(10)
            }}>
                <Text style={{ fontSize: scaleSizeW(17), fontWeight: "bold" }}>您还没有相关的订单</Text>
                <Text style={{ color: "grey", fontSize: scaleSizeW(13), marginTop: scaleSizeW(5) }}>可以去看看有哪些想买的</Text>
            </View>
            <RowDivider>
                <View style={{ flexDirection: "row" }}>
                    <Icon name="favorite" color="#E36235" />
                    <Text style={{ color: "#E36235", fontSize: scaleSizeW(13), marginLeft: scaleSizeW(5) }}>你可能喜欢</Text>
                </View>
            </RowDivider>
            <RecommendList isEndReached={isEndReached}></RecommendList>
        </ScrollView>
    )
}

