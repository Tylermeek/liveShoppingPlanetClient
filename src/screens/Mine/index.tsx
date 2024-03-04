import React from "react";
import { StyleSheet } from "react-native";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type MineProps = CompositeTabScreenParamList<"Mine">;

const Mine: React.FC<MineProps> = ({ navigation }) => {

    return <>
        <GestureHandlerRootView style={{ flex: 1 }}>

        </GestureHandlerRootView>
    </>
}

const styles = StyleSheet.create({

})

export default Mine
