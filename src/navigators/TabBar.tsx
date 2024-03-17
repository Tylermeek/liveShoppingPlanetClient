import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { Icon, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { getEnumValue } from "utlis/type";
import { TabIconName, tabConfig } from "./TabConfig";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { canVisit, isLogin } from "hook/useAuth";
import { Views } from "types/navigation";

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const logined = isLogin();
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
        height: scaleSizeW(40),
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          console.log("test", logined);

          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            if (canVisit(logined, Views[route.name as Views])) {
              navigation.navigate(route.name, route.params);
            } else {
              navigation.navigate(Views.LogIn);
            }
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
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
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Icon
              name={getEnumValue(route.name, TabIconName)}
              color={isFocused ? "#E36255" : "#b5b7cc"}
              style={{ fontSize: scaleSizeH(18) }}
            ></Icon>
            <Text
              style={{
                color: isFocused ? "#E36255" : "#b5b7cc",
                fontSize: scaleSizeH(10),
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const TabNav = createBottomTabNavigator();

export type TabBarParamList = {
  Home: undefined;
  Live: undefined;
  Cart: undefined;
  Mine: undefined;
  LogIn: undefined;
};

const TabBar: React.FC<TabBarParamList> = () => {
  return (
    <>
      <TabNav.Navigator
        initialRouteName="Playground"
        tabBar={(props) => <MyTabBar {...props} />}
        screenOptions={{ headerShown: false }}
        sceneContainerStyle={{ backgroundColor: "transparent" }}
      >
        {tabConfig.map(({ name, options, component }) => {
          return (
            <TabNav.Screen
              key={name}
              name={name}
              component={component as any}
              options={options}
            ></TabNav.Screen>
          );
        })}
      </TabNav.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default TabBar;
