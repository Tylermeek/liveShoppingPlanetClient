import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import { SwiperInfoList, getSiwperList } from "axios/api/recommend";
import { Image, Skeleton } from "@rneui/themed";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { ProductSwiperInfo } from "types/info";
import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { Views } from "types/config";

const AdSwipper: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true)
    const [swiperList, setSwiperList] = useState<SwiperInfoList>([])
    const navigation = useNavigation()
    const containerWidth = (Dimensions.get('window').width - 4 * scaleSizeW(10)) / 2

    const handlePress = (slide: ProductSwiperInfo) => {
        console.log(slide.id);
        // TODO 跳转商品详情页
        navigation.navigate(Views.ProductDetail, { productId: slide.id })


    }
    useEffect(() => {
        getSiwperList()
            .then(res => {
                setSwiperList(res.data)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return <>
        {
            loading
                ?
                <Skeleton animation="pulse" width={containerWidth} height={scaleSizeH(200)} />
                :
                <View style={{ flex: 1 }}>
                        <Carousel
                            loop
                            width={containerWidth}
                            height={scaleSizeH(200)}
                            autoPlay={true}
                            data={swiperList}
                            pagingEnabled={false}
                            snapEnabled        
                            scrollAnimationDuration={1500}
                            renderItem={({ item, index }) => (
                                <TouchableOpacity key={item.id} style={{ flex: 1 }} onPress={() => handlePress(item)}>
                                    <Image source={{ uri: item.image }} style={{ height: "100%", width: "100%", borderRadius: scaleSizeW(5) }}></Image>
                                </TouchableOpacity>
                            )}
                            style={{ borderRadius: scaleSizeW(5) }}
                        />
                </View>
        }
    </>
}

const styles = StyleSheet.create({
    dotStyle: {
        height: scaleSizeH(3),
        width: scaleSizeW(3)
    }
})

export default AdSwipper
