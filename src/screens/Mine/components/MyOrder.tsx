import { Icon } from '@rneui/base'
import { Badge, Button, Text } from '@rneui/themed'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { scaleSizeW } from 'utlis/scaleSize'
import Title from './Title'
import RecentOrder from './RecentOrder'

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
            <Title title='我的订单' />
            <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                {
                    orderTypeList.map(({ title, icon }) => (
                        <View key={title}>
                            <Button
                                title={title}
                                icon={<Icon name={icon} color='grey' size={27} />}
                                iconPosition='top'
                                type='clear'
                                titleStyle={{ fontSize: scaleSizeW(12), marginTop: scaleSizeW(5), color: 'grey' }}
                            />
                            <Badge
                                status="primary"
                                value={9}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
                                containerStyle={{ position: 'absolute', top: 5, right: 10 }}
                            />
                        </View>
                    ))
                }
            </View>
            <RecentOrder />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: scaleSizeW(15),
        backgroundColor: "white",
        marginHorizontal:scaleSizeW(10),
        paddingVertical: scaleSizeW(10),
        paddingHorizontal: scaleSizeW(10),
        marginTop:scaleSizeW(10)
    }
})
