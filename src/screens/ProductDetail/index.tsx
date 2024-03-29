import { useRoute } from "@react-navigation/native";
import { TabView, Text } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Views, RootRouteType } from "types/navigation";
import Banner from "./components/TopBanner";
import { Tab } from "@rneui/base";
import BottomBanner from "./components/BottomBanner";
import ProductPage from "./components/ProductPage";
import DetailPage from "./components/DetailPage";
import CommentPage from "./components/CommentPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

const ProductDetail: React.FC = () => {
    const route = useRoute<RootRouteType<Views.ProductDetail>>()
    const [activeTab, setActiveTab] = useState<number>(0)
    const goodsId = route.params.goodsId
    return <GestureHandlerRootView style={{ flex: 1 }}>
        <Banner activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabView containerStyle={{ flex: 1 }} value={activeTab} onChange={setActiveTab}>
            <TabView.Item style={{ backgroundColor: "transparent" }}>
                <ProductPage goodsId={goodsId} />
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
                <DetailPage goodsId={goodsId}></DetailPage>
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
                <CommentPage goodsId={goodsId}></CommentPage>
            </TabView.Item>
        </TabView>
        <BottomBanner goodsId={goodsId}></BottomBanner>
    </GestureHandlerRootView>
}

const styles = StyleSheet.create({

})

export default ProductDetail
