import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getEnumValue } from "utlis/type";
import { TabIconName, tabConfig } from "./TabConfig";
import { scaleSizeH } from "utlis/scaleSize";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={{ flexDirection: 'row', backgroundColor:"white" }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.title || route.name;
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ height: scaleSizeH(40), flex: 1, justifyContent: "center", alignItems: "center" }}
                    >
                        <Icon name={getEnumValue(route.name, TabIconName)} color={isFocused ? '#E36255' : '#b5b7cc'} style={{ fontSize: scaleSizeH(18) }}></Icon>
                        <Text style={{ color: isFocused ? '#E36255' : '#b5b7cc', fontSize: scaleSizeH(10) }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const TabNav = createBottomTabNavigator()

export type TabBarParamList = {
    Home: undefined,
    Live: undefined
}

const TabBar: React.FC<TabBarParamList> = () => {
    return <>
        <TabNav.Navigator
            initialRouteName="Live"
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{ headerShown: false }}
            sceneContainerStyle={{backgroundColor:"transparent"}}
        >
            {
                tabConfig.map(({ name, options, component }) => {
                    return (
                        <TabNav.Screen
                            key={name}
                            name={name}
                            component={component as any}
                            options={options}>
                        </TabNav.Screen>
                    )
                })
            }
        </TabNav.Navigator >
    </>
}

const styles = StyleSheet.create({

})

export default TabBar