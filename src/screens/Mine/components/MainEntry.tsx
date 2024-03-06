import { Icon } from '@rneui/base'
import { Button } from '@rneui/themed'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { scaleSizeH, scaleSizeW } from 'utlis/scaleSize'

export default function MainEntry() {

    const entryConfig = [
        {
            title: "收藏",
            icon: "settings"
        },
        {
            title: "关注店铺",
            icon: "settings"
        },
        {
            title: "足迹",
            icon: "settings"
        },
        {
            title: "作品",
            icon: "settings"
        },
    ]

    return (
        <View style={styles.container}>
            {
                entryConfig.map((entry) => (
                    <Button
                        title={entry.title}
                        icon={<Icon name={entry.icon} color='grey' size={20} />}
                        iconPosition='top'
                        type='clear'
                        titleStyle={{ fontSize: scaleSizeW(11), marginTop: scaleSizeW(5), color: 'grey' }}
                    />
                ))
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopLeftRadius: scaleSizeW(10),
        borderTopRightRadius: scaleSizeW(10),
        backgroundColor: "#ff9",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: scaleSizeW(5)
    }
})
