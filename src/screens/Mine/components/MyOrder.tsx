import { Icon } from '@rneui/base'
import { Button, Text } from '@rneui/themed'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { scaleSizeH, scaleSizeW } from 'utlis/scaleSize'

export default function MyOrder() {

    const orderTypeList = [
        {
            title: "待付款",
            icon: "settings"
        },
        {
            title: "待发货",
            icon: "settings"
        },
        {
            title: "待收货",
            icon: "settings"
        },
        {
            title: "待评价",
            icon: "settings"
        },
        {
            title: "退款/售后",
            icon: "settings"
        },
    ]

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between",alignItems:"center" }}>
                <Text>我的订单</Text>
                <Button
                    size="sm"
                    type='clear'
                    title="全部"
                    titleStyle={{ color: "grey", fontSize: scaleSizeW(11) }}
                    icon={<Icon name='settings' color="grey" size={15} />} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                {
                    orderTypeList.map(({ title, icon }) => (
                        <Button
                            title={title}
                            icon={<Icon name={icon} color='grey' size={27} />}
                            iconPosition='top'
                            type='clear'
                            titleStyle={{ fontSize: scaleSizeW(13), marginTop: scaleSizeW(5), color:'grey' }}
                        />
                    ))
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: scaleSizeW(15),
        borderTopRightRadius: scaleSizeW(15),
        backgroundColor: "#f99",
        paddingVertical: scaleSizeW(10),
        paddingHorizontal: scaleSizeW(10)
    }
})
