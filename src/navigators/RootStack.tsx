import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import TabBar from "./TabBar";

const routeConfig = [
    {
        name: "Tab",
        component: TabBar
    }
]

const RootNav = createNativeStackNavigator()

const RootStack: React.FC = () => {
    return <>
        <NavigationContainer>
            <RootNav.Navigator screenOptions={{ headerShown: false }}>
                {
                    routeConfig.map(({ name, component }) => {
                        return (
                            <RootNav.Screen key={name} name={name} component={component}></RootNav.Screen>
                        )
                    })
                }
            </RootNav.Navigator>
        </NavigationContainer>
    </>
}

const styles = StyleSheet.create({

})

export default RootStack