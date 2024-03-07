import { Icon, Button } from '@rneui/themed'
import React from 'react'
import { View, Text } from 'react-native'
import { scaleSizeW } from 'utlis/scaleSize'

export default function Title({ title }: { title: string }) {
    const handlePress = () => {
        console.log("all");

    }
    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text>{title}</Text>
            <Button
                size="sm"
                type='clear'
                title="全部"
                titleStyle={{ color: "grey", fontSize: scaleSizeW(11) }}
                icon={<Icon name='settings' color="grey" size={15} />}
                onPress={handlePress}
            />

        </View>
    )
}
