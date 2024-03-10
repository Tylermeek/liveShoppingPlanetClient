import { Button, Icon, Text } from "@rneui/themed";
import { StatusBar, StyleSheet, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";

export default function Header() {
    function handleReadAll(): void {
        console.log("handleReadAll");
    }

    function handleSearchMsg(): void {
        console.log("handleSearchMsg");
    }

    return (
        <View style={[styles.flexRowBox, styles.container]}>
            <Text h1>信息（999+）</Text>
            <View style={[styles.flexRowBox]}>
                <Button icon={<Icon name="done-all" />} type="clear" onPress={handleReadAll} />
                <Button icon={<Icon name="search" />} type="clear" onPress={handleSearchMsg} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: scaleSizeW(10),
        marginTop: StatusBar.currentHeight! + 10,
        justifyContent: "space-between",

    },
    flexRowBox: {
        flexDirection: "row",
    }
})