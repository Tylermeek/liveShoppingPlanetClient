import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserInfo } from "hook/useUserInfo";
import Header from "./components/Header";
import MainEntry from "./components/MainEntry";
import MyOrder from "./components/MyOrder";

type MineProps = CompositeTabScreenParamList<"Mine">;

const Mine: React.FC<MineProps> = ({ navigation }) => {

    const { userInfo } = useUserInfo()
    useEffect(() => {
        console.log(userInfo);
    }, [])
    return <>
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Header />
            <MainEntry />
            <MyOrder />
        </GestureHandlerRootView>
    </>
}

const styles = StyleSheet.create({

})

export default Mine
