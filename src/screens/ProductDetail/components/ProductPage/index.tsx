import { Image, Skeleton } from "@rneui/themed";
import { CoverList, getProductCoverList, getProductInfo } from "axios/api/product";
import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ProductInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import CoverSwipper from "./CoverSwipper";
import IntroCard from "./IntroCard";
import ShopCard from "./ShopCard";
import RecommendProduct from "./RecommendProduct";
import { handleMomentumScrollEnd } from "utlis/method";

interface ProductInfoProps {
    productId: number
}
const ProductPage: React.FC<ProductInfoProps> = ({ productId }) => {
    const [info, setInfo] = useState<ProductInfo | null>(null)
    const [isEndReached, setIsEndReached] = useState<boolean>(false)
    useEffect(() => {
        getProductInfo(productId)
            .then((res) => {
                setInfo(res.data)
            })
    }, [])

    return <>
        <ScrollView showsVerticalScrollIndicator={false}
            onScroll={(event) => handleMomentumScrollEnd(event, isEndReached, setIsEndReached)}
            scrollEventThrottle={50}
        >
            <CoverSwipper productId={productId} />
            {
                info &&
                <>
                    <IntroCard info={info} />
                    <ShopCard shopInfo={info.shopInfo} />
                    <RecommendProduct productName={info?.title} isEndReached={isEndReached}></RecommendProduct>
                </>
            }
        </ScrollView>

    </>
}

const styles = StyleSheet.create({

})

export default ProductPage
