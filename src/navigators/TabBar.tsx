import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import Home from "screens/Home";
import Live from "screens/Live";

const TabNav = createBottomTabNavigator()

const TabBar: React.FC = () => {
    return <>
        <TabNav.Navigator screenOptions={{ headerShown: false }}>
            <TabNav.Screen name="Home" component={Home}></TabNav.Screen>
            <TabNav.Screen name="Live" component={Live}></TabNav.Screen>
        </TabNav.Navigator >
    </>
}

const styles = StyleSheet.create({

})

export default TabBar