import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getEnumValue } from "utlis/type";
import { TabIconName, tabConfig } from "./TabConfig";
import { scaleSizeH } from "utlis/scaleSize";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    return (
        <View style={{ flexDirection: 'row' }}>
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
                        style={{ flex: 1, alignItems: "center" }}
                    >
                        <Icon name={getEnumValue(route.name, TabIconName)} color={isFocused ? '#673ab7' : '#222'}></Icon>
                        <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
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
            tabBar={(props) => <MyTabBar {...props} />}
            screenOptions={{ headerShown: false }}
            sceneContainerStyle={{
                borderBottomColor: "rgba(0, 0, 0, 0.1)",
                borderBottomWidth: scaleSizeH(0.5)
            }}
        >
            {
                tabConfig.map(({ name, options, component }) => {
                    return (
                        <TabNav.Screen
                            key={name}
                            name={name}
                            component={component}
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