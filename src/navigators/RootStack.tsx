import { CompositeScreenProps, NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps, createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, View } from "react-native";
import TabBar, { TabBarParamList } from "./TabBar";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import SearchDetail from "screens/SearchDetail";
import LiveRoom from "screens/LiveRoom";
import SearchResultList from "screens/SearchResultList";

export type CompositeTabScreenParamList<T extends keyof TabBarParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabBarParamList, T>,
    NativeStackScreenProps<RootStackParamList>
>;


const routeConfig = [
    {
        name: "Tab",
        component: TabBar
    }, 
    {
        name: "SearchDetail",
        component: SearchDetail
    },
    {
        name:"LiveRoom",
        component: LiveRoom
    },
    {
        name: "SearchResultList",
        component: SearchResultList
    }
]

const RootNav = createNativeStackNavigator()

type StackPropsHandler<T> = {
    screen: keyof T,
    params?: T[keyof T],
}

type RootStackParamList = {
    Tab: StackPropsHandler<TabBarParamList>
}

const RootStack: React.FC<RootStackParamList> = () => {
    return <>
        <NavigationContainer>
            <RootNav.Navigator screenOptions={{ headerShown: false }}>
                {
                    routeConfig.map(({ name, component }) => {
                        return (
                            <RootNav.Screen
                                key={name}
                                name={name}
                                component={component as any}
                            >
                            </RootNav.Screen>
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