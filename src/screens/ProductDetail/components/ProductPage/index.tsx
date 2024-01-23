import { Image, Skeleton } from "@rneui/themed";
import { CoverList, getProductCoverList, getProductInfo } from "axios/api/product";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { ProductInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import CoverSwipper from "./CoverSwipper";
import IntroCard from "./IntroCard";

interface ProductInfoProps {
    productId: number
}
const ProductPage: React.FC<ProductInfoProps> = ({ productId }) => {
    const [info, setInfo] = useState<ProductInfo>()
    useEffect(() => {
        getProductInfo(productId)
            .then((res) => {
                setInfo(res.data)
            })
    }, [])

    return <>
        <View style={{ flex: 1 }}>
            <CoverSwipper productId={productId} />
            <IntroCard info={info}/>
        </View>

    </>
}

const styles = StyleSheet.create({

})

export default ProductPage
