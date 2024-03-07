import React from 'react'
import { StyleSheet, View } from 'react-native'
import Title from './Title'
import { Text } from '@rneui/themed'
import { scaleSizeW } from 'utlis/scaleSize'

export interface walletContent {
    type: string,
    name: string,
    content: string
}

export default function Wallet() {

    const contentList: walletContent[] = [
        {
            type: "redPacket",
            name: "红包",
            content: "￥100",
        },
        {
            type: "coupon",
            name: "优惠券",
            content: "3张"
        },
        {
            type: "points",
            name: "积分",
            content: "9099"
        }
    ]

    return (
        <View style={styles.container}>
            <Title title='我的钱包' />
            <View style={{ flexDirection: "row", justifyContent: "space-around", paddingVertical: scaleSizeW(10) }}>
                {
                    contentList.map(({ name, type, content }) => (
                        <View key={type} style={{ alignItems: "center" }}>
                            <Text style={{ fontSize: scaleSizeW(15), fontWeight: "bold" }}>{content}</Text>
                            <Text style={{ marginTop: scaleSizeW(5), fontSize: scaleSizeW(12) }}>{name}</Text>
                        </View>
                    )
                    )
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        borderRadius: scaleSizeW(15),
        backgroundColor: "white",
        marginHorizontal: scaleSizeW(10),
        paddingVertical: scaleSizeW(10),
        paddingHorizontal: scaleSizeW(10),
        marginTop:scaleSizeW(10)
    }
})