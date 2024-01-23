import { Image, Skeleton } from "@rneui/themed";
import { CoverList, getProductCoverList } from "axios/api/product";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { scaleSizeH } from "utlis/scaleSize";

interface CoverSwipperProps {
    productId: number
}

const CoverSwipper: React.FC<CoverSwipperProps> = ({ productId }) => {
    const [coverList, setCoverList] = useState<CoverList>([])
    const [coverLoading, setCoverLoading] = useState<boolean>(true)
    const containerWidth = Dimensions.get('window').width

    useEffect(() => {

        getProductCoverList(productId)
            .then(res => {
                console.log(res.data);

                setCoverList(res.data)
            })
            .finally(()=>{
                setCoverLoading(false)
            })

    }, [])
    return (coverLoading
        ?
        <Skeleton animation="pulse" width={containerWidth} height={scaleSizeH(320)} />
        :
        <Carousel
            loop={false}
            width={containerWidth}
            height={scaleSizeH(320)}
            autoPlay={false}
            data={coverList}
            scrollAnimationDuration={1000}

            renderItem={({ item, index }) => (
                <Image source={{ uri: item }} style={{ height: "100%", width: "100%" }} />
            )}
        />
    )
}

const styles = StyleSheet.create({

})

export default CoverSwipper
