import { Text } from '@rneui/themed'
import GoBack from 'components/GoBack'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { scaleSizeW } from 'utlis/scaleSize'

export default function Header() {
    return (
        <View style={{
            flexDirection: "row",
            margin: scaleSizeW(10),
            marginTop: StatusBar.currentHeight! + 10,
            alignItems: "center"
        }}>
            <GoBack />
            <Text h1>shop</Text>
        </View>
    )
}
