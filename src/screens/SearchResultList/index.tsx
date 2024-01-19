import { useRoute } from "@react-navigation/native";
import { Text } from "@rneui/base";
import Camera from "components/Camera";
import GoBack from "components/GoBack";
import SearchBanner from "components/SearchBanner";
import { trim } from "lodash-es";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RootRouteType, Views } from "types/config";

const SearchResultList: React.FC = () => {
    // TODO 搜索结果页面
    const [searchRef, setSearchRef] = useState<any>(null)
    const route = useRoute<RootRouteType<Views.SearchResultList>>()
    const serachContent = route.params.content

    useEffect(() => {
        // searchRef.
    }, [])
    return <>
        <View>
            <SearchBanner
                LeftIcon={GoBack}
                RightIcon={Camera}
                searchProps={{ bindRef: setSearchRef, initContent: serachContent, editable: true }}
            />
        </View>
    </>
}

const styles = StyleSheet.create({

})

export default SearchResultList
