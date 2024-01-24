import { useRoute } from "@react-navigation/native";
import { TabView, Text } from "@rneui/themed";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Views, RootRouteType } from "types/config";
import Banner from "./components/TopBanner";
import { Tab } from "@rneui/base";
import BottomBanner from "./components/BottomBanner";
import ProductPage from "./components/ProductPage";
import DetailPage from "./components/DetailPage";
import CommentPage from "./components/CommentPage";

const ProductDetail: React.FC = () => {
    const route = useRoute<RootRouteType<Views.ProductDetail>>()
    const [activeTab, setActiveTab] = useState<number>(0)
    const productId = route.params.productId
    return <>
        <Banner activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabView containerStyle={{ flex: 1 }} value={activeTab} onChange={setActiveTab}>
            <TabView.Item style={{ backgroundColor: "transparent" }}>
                <ProductPage productId={productId} />
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
                <DetailPage productId={productId}></DetailPage>
            </TabView.Item>
            <TabView.Item style={{ flex: 1 }}>
                <CommentPage  productId={productId}></CommentPage>
            </TabView.Item>
        </TabView>
        <BottomBanner></BottomBanner>
    </>
}

const styles = StyleSheet.create({

})

export default ProductDetail
