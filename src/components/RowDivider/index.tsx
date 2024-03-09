import { Icon } from '@rneui/base'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { scaleSizeW } from 'utlis/scaleSize'

export default function RowDivider({ children }: { children: any }) {
    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.boderBox, { marginRight: scaleSizeW(10) }]}></View>
            {children}
            <View style={[styles.boderBox, { marginLeft: scaleSizeW(10) }]}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    boderBox: {
        flex: 1,
        height: "50%",
        borderBottomWidth: 1,
        borderColor: "#E36235",
    }
})