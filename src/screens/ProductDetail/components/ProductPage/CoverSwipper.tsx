import { Image, Skeleton } from "@rneui/themed";
import { CoverList, getProductCoverList } from "axios/api/product";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { scaleSizeH } from "utlis/scaleSize";

interface CoverSwipperProps {
    productId: number
}

const CoverSwipper: React.FC<CoverSwipperProps> = ({ productId }) => {
    // todo 切换为手动切换且可预览的图片
    const [coverList, setCoverList] = useState<CoverList>([])
    const [coverLoading, setCoverLoading] = useState<boolean>(true)
    const containerWidth = Dimensions.get('window').width

    useEffect(() => {

        getProductCoverList(productId)
            .then(res => {
                console.log("setCoverList",res.data);

                setCoverList(res.data)
            })
            .finally(() => {
                setCoverLoading(false)
            })

    }, [])
    return (coverLoading
        ?
        <Skeleton animation="pulse" width={containerWidth} height={scaleSizeH(320)} />
        :
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Carousel
                loop
                width={containerWidth}
                height={scaleSizeH(320)}
                autoPlay={false}
                data={coverList}
                scrollAnimationDuration={2000}

                renderItem={({ item, index }) => (
                    <Image source={{ uri: item }} style={{ height: "100%", width: "100%" }} />
                )}
            />
        </GestureHandlerRootView>

    )
}

const styles = StyleSheet.create({

})

export default CoverSwipper
