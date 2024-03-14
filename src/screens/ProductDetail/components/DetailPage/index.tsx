import { Image } from "@rneui/themed";
import { DetailList, getProductDetailList } from "axios/api/goods";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { scaleSizeH } from "utlis/scaleSize";

interface DetailPageProps {
    productId: number
}

const DetailPage: React.FC<DetailPageProps> = ({ productId }) => {
    const [list, setList] = useState<DetailList>([])
    useEffect(() => {
        getProductDetailList(productId)
            .then((res) => {
                console.log(res.data);
                
                setList(res.data)
            })
    }, [])
    return <ScrollView>
        {
            list.map((img, index) => {
                return <Image key={`${index}${img}`} source={{ uri: img }} style={{ width: "100%", height: scaleSizeH(320) }} />
            })
        }
    </ScrollView>
}

const styles = StyleSheet.create({

})

export default DetailPage
