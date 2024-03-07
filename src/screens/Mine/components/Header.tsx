import { Avatar, Button, Icon, Text } from '@rneui/themed'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { scaleSizeH, scaleSizeW } from 'utlis/scaleSize'
import { LinearGradient } from 'expo-linear-gradient'

export default function Header() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#ee784f", "#f29b7c", "#f39f81", '#f7a385', '#ffb69c', "#facfc0", "#eed4ca"]}
                style={[styles.linearGradient]
                }
            />
            <View style={styles.userContainer}>
                <Avatar
                    source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
                    rounded size="medium"
                />
                <View style={{ marginLeft: scaleSizeW(10) }}>
                    <Text
                        style={{
                            fontSize: scaleSizeW(20),
                            fontWeight: "bold"
                        }}
                    >
                        nickName
                    </Text>
                    <Text
                        style={{
                            fontWeight: "100",
                            color: "grey",
                            fontSize: scaleSizeW(13)
                        }}>
                        账号名 account
                    </Text>
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
        height: scaleSizeW(150),
        flexDirection: "row",
        paddingTop: (StatusBar.currentHeight! + 20),
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "grey",
        paddingBottom: scaleSizeH(10),
        position: "relative",
        overflow: "visible"
    },
    userContainer: {
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    linearGradient: {
        height: scaleSizeW(160),
        width: "100%",
        position: "absolute",
        top: 0,
        left: 0
    },
})