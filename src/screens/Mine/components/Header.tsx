import { Avatar, Button, Icon, Text } from '@rneui/themed'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { scaleSizeH, scaleSizeW } from 'utlis/scaleSize'

export default function Header() {
    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Avatar source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }} rounded size="medium" />
                <View style={{ marginLeft: scaleSizeW(20) }}>
                    <Text style={{ fontSize: scaleSizeW(20), fontWeight: "bold" }}>nickName</Text>
                    <Text style={{ fontWeight: "100", color: "grey", fontSize: scaleSizeW(13) }}>账号名 account</Text>
                </View>
            </View>
            <Button
                icon={<Icon name="settings" />}
                iconPosition="top"
                title="设置"
                size="sm"
                type="clear"
                titleStyle={{ fontSize: scaleSizeW(12), color: "grey" }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingTop: (StatusBar.currentHeight! + 20),
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "grey",
        paddingBottom: scaleSizeH(20)
    },
    userContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
})