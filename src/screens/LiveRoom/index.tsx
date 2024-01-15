import { useNavigation, useRoute } from "@react-navigation/native";
import { Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootRouteType } from "types";

const LiveRoom: React.FC = () => {
    const route = useRoute<RootRouteType>()

    const userId = route.params?.userId
    const userName = route.params?.userName

    return <>
        <View>
            <Text>LiveRoom{userId}--{userName}</Text>
        </View>
    </>
}

const styles = StyleSheet.create({

})

export default LiveRoom
