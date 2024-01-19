import { useRoute } from "@react-navigation/native";
import { Text } from "@rneui/base";
import React from "react";
import { StyleSheet, View } from "react-native";
import { RootRouteType, Views } from "types/config";

const SearchResultList: React.FC = () => {
    // TODO 搜索结果页面
    const route = useRoute<RootRouteType<Views.SearchResultList>>()

    return <>
        <View>
            <Text>{route.params?.content}</Text>
        </View>
    </>
}

const styles = StyleSheet.create({

})

export default SearchResultList
