import { Button, Image, Text } from '@rneui/themed'
import { useEffect, useState } from 'react'
import { Dimensions, TouchableOpacity, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { scaleSizeH, scaleSizeW } from 'utlis/scaleSize'

interface orderInfo {
    id: string,
    cover: string,
    productName: string,
    status: string,
    updateTime: string
}

export default function RecentOrder() {
    const [orderList, setOrderList] = useState<orderInfo[]>([])
    const containerWidth = (Dimensions.get('window').width - 4 * scaleSizeW(10))

    const handlePress = (order: orderInfo) => {
        console.log("press", order);

    }

    useEffect(() => {
        setOrderList([
            {
                id: "1",
                cover: "https://randomuser.me/api/portraits/men/36.jpg",
                productName: "test1",
                status: "已签收",
                updateTime: `12:32:22`
            },
            {
                id: "2",
                cover: "https://randomuser.me/api/portraits/men/36.jpg",
                productName: "test2",
                status: "已到达杭州中转站",
                updateTime: `18:10:17`
            }
        ])
    }, [])

    return (
        <View style={{ backgroundColor: '#ebebeb', borderRadius: scaleSizeW(10) }}>
            <Carousel
                loop
                width={containerWidth}
                height={scaleSizeW(60)}
                autoPlay
                data={orderList}
                pagingEnabled={false}
                snapEnabled
                vertical
                scrollAnimationDuration={1500}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={item.id} style={{ flex: 1 }} onPress={() => handlePress(item)}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    height: scaleSizeW(60),
                                    marginLeft: scaleSizeW(10)
                                }}>
                                <View style={{ width: scaleSizeW(40), height: scaleSizeW(40) }}>
                                    <Image
                                        source={{ uri: item.cover }}
                                        style={{
                                            height: "100%",
                                            width: "100%",
                                            borderRadius: scaleSizeW(5)
                                        }}
                                    />
                                </View>
                                <View style={{ marginLeft: scaleSizeW(5) }}>
                                    <Text style={{ fontSize: scaleSizeW(12) }}>{item.productName}</Text>
                                    <Text style={{ fontSize: scaleSizeW(10) }}>{item.status}</Text>
                                </View>
                                <View style={{ marginLeft: scaleSizeW(5) }}>
                                    <Text style={{ fontSize: scaleSizeW(12) }}>{item.updateTime}</Text>
                                </View>
                            </View>
                            <View style={{ marginRight: scaleSizeW(10) }}>
                                <Button
                                    title="查看"
                                    type="outline"
                                    size="sm"
                                    radius="lg"
                                    titleStyle={{
                                        fontSize: scaleSizeW(11),
                                        paddingHorizontal: scaleSizeW(5)
                                    }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                style={{ borderRadius: scaleSizeW(5) }}
            />
        </View>
    )
}
