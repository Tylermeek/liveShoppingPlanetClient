import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import  TabBar from "./TabBar";

const RootNav = createNativeStackNavigator()

const RootStack: React.FC = () => {
    return <>
        <NavigationContainer>
            <RootNav.Navigator screenOptions={{ headerShown: false }}>
                <RootNav.Screen name="Tab" component={TabBar}></RootNav.Screen>
            </RootNav.Navigator>
        </NavigationContainer>
    </>
}

const styles = StyleSheet.create({

})

export default RootStack