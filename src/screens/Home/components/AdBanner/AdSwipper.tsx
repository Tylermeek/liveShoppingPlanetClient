import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Swiper, { SwiperProps } from "react-native-swiper";
import { SwiperInfoList, getSiwperList } from "axios/api/recommend";
import { Image } from "@rneui/themed";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { SwiperInfo } from "types/info";

const AdSwipper: React.FC = () => {

    const [swiperList, setSwiperList] = useState<SwiperInfoList>([])

    const handlePress = (slide: SwiperInfo) => {
        console.log(slide.id);
        // TODO 跳转商品详情页
        
    }
    useEffect(() => {
        getSiwperList()
            .then(res => {
                setSwiperList(res.data)
            })
    }, [])

    return <>
        <View style={{ flex: 1 }}>
            <Swiper
                showsButtons={false}
                dotStyle={styles.dotStyle}
                activeDotStyle={[styles.dotStyle, { backgroundColor: "#E36255" }]}
                autoplay={true}
            >
                {
                    !isEmptyArr(swiperList) && swiperList.map((slide) => {
                        return <TouchableOpacity key={slide.id} style={{ flex: 1 }} onPress={()=>handlePress(slide)}>
                            <Image source={{ uri: slide.image }} style={{ height: "100%", width: "100%", borderRadius: scaleSizeW(5) }}></Image>
                        </TouchableOpacity>
                    })
                }

            </Swiper>
        </View>
    </>
}

const styles = StyleSheet.create({
    dotStyle: {
        height: scaleSizeH(3),
        width: scaleSizeW(3)
    }
})

export default AdSwipper
