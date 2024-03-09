import { Avatar, Image, Text } from '@rneui/themed'
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { isEmptyArr } from 'utlis/method'
import { scaleSizeW } from 'utlis/scaleSize'
import OrderItem from './OrderItem'
import Empty from './Empty'

export default function OrderLIst() {
    const list = [
        {
            "order_id": "ORD123456",
            "customer_name": "张三",
            "customer_email": "zhangsan@example.com",
            "order_date": "2024-03-09",
            "order_status": "pending",
            "shipping_address": {
                "street": "123 Main St",
                "city": "Beijing",
                "province": "Beijing",
                "country": "China",
                "postal_code": "100000"
            },
            "shopInfo": {
                "name": "shop1",
                "avatar": "https://randomuser.me/api/portraits/men/31.jpg",
            },
            "productInfo": {
                "product_id": "PROD001",
                "product_name": "电视",
                "sku": "TV-001",
                "quantity": 1,
                "unit_price": 3000,
                "product_image": "https://randomuser.me/api/portraits/men/6.jpg",
                "package_included": true,
                "shipping_status": "not_shipped"
            },
            "totalMoney": 2800,
            "shipping_status": "partially_shipped"
        },
        {
            "order_id": "ORD789012",
            "customer_name": "李四",
            "customer_email": "lisi@example.com",
            "order_date": "2024-03-10",
            "order_status": "processing",
            "shipping_address": {
                "street": "456 Park Ave",
                "city": "Shanghai",
                "province": "Shanghai",
                "country": "China",
                "postal_code": "200000"
            },
            "shopInfo": {
                "name": "shop2",
                "avatar": "https://randomuser.me/api/portraits/women/50.jpg"
            },
            "productInfo": {
                "product_id": "PROD002",
                "product_name": "冰箱",
                "sku": "FRIDGE-002",
                "quantity": 1,
                "unit_price": 5000,
                "product_image": "https://randomuser.me/api/portraits/women/4.jpg",
                "package_included": false,
                "shipping_status": "shipped"
            },
            "totalMoney": 4800,
            "shipping_status": "shipped"
        },
    ]

    return (
        isEmptyArr(list) ?
            (
                <ScrollView style={{ flex: 1 }}>
                    {list.map((order) => (
                        <OrderItem key={order.order_id} order={order} />
                    ))}
                </ScrollView>
            )
            : <Empty />
    )
}


const styles = StyleSheet.create({
    flexRowBox: {
        flexDirection: "row",
        alignItems: "center"
    },
    container: {

    }
})