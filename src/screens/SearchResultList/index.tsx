import { useRoute } from "@react-navigation/native";
import { Text } from "@rneui/base";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import SearchBanner from "components/SearchBanner";
import { assign, merge, trim } from "lodash-es";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import ProductList from "./components/ProductList";
import {
  MaterialTopTabBarProps,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import LiveList from "./components/LiveList";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootRouteType, Views } from "types/navigation";

const Tab = createMaterialTopTabNavigator();

const tabConfig = [
  {
    name: "ProductList",
    Component: ProductList,
    options: {
      title: "商品",
    },
  },
  // {
  //     name: "Live",
  //     Component: LiveList,
  //     options: {
  //         title: "直播"
  //     }
  // }
];

function MyTabBar({ state, descriptors, navigation }: MaterialTopTabBarProps) {
  return (
    <View style={styles.tabConatiner}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.title || route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
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
            <Text
              style={{
                color: isFocused ? "#E36255" : "#b5b7cc",
                fontSize: scaleSizeW(13),
                padding: scaleSizeW(10),
                paddingTop: 0,
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

const SearchTabs = ({ searchContent }: { searchContent: string }) => {
  return (
    <Tab.Navigator tabBar={(props: any) => <MyTabBar {...props} />}>
      {tabConfig.map(({ name, options, Component }) => {
        return (
          <Tab.Screen
            key={name}
            name={name}
            component={Component as any}
            options={options}
            initialParams={{ searchContent: searchContent }}
          ></Tab.Screen>
        );
      })}
    </Tab.Navigator>
  );
};

const SearchResultList: React.FC = () => {
  // TODO 搜索结果页面
  const [searchRef, setSearchRef] = useState<any>(null);
  const route = useRoute<RootRouteType<Views.SearchResultList>>();
  const searchContent = route.params.content;

  useEffect(() => {}, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchBanner
        LeftIcon={GoBack}
        RightIcon={Camera}
        searchProps={{
          bindRef: setSearchRef,
          initContent: searchContent,
          editable: true,
        }}
        bannerStyle={{
          backgroundColor: "transparent",
          borderBottomWidth: 0,
        }}
      />
      <SearchTabs searchContent={searchContent} />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabConatiner: {
    // height: scaleSizeH(52),
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  tabViewContainer: {
    width: "100%",
  },
});

export default SearchResultList;
