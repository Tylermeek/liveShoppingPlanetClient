import { Avatar } from "@rneui/themed";
import { followingInfo, getLivingfollowingList } from "axios/api/followList";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";



const LivingFollowingList: React.FC = () => {
    const [list, setList] = useState<followingInfo[]>([])

    const initList = async () => {
        try {
            const res = await getLivingfollowingList()
            console.log(res.data);

            setList(res.data)
        } catch (error) {

        }
    }

    const goLiveRoom = () => {
        
    }

    useEffect(() => {
        initList()
    }, [])

    return (
        Array.isArray(list) && list?.length !== 0
            ?
            <View style={styles.container}>
                <Text style={styles.title}>正在关注</Text>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    overScrollMode="never" // 取消横向反弹效果
                >
                    <View style={styles.listConatiner}>
                        {
                            list.map((user) => {
                                return (
                                    <TouchableOpacity style={styles.user} key={user.id} onPress={goLiveRoom}>
                                        <Avatar
                                            size={32}
                                            rounded
                                            source={{ uri: user.avatar }}
                                        />
                                        <Text style={styles.username}>{user.name}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </View>
            : <></>
    )
}

const styles = StyleSheet.create({
    container: {
        height: scaleSizeH(100),
        width: "100%",
        backgroundColor: "white",
        marginTop: scaleSizeH(10)
    },
    title: {
        height: scaleSizeH(30),
        width: "100%",
        fontSize: scaleSizeH(13),
        paddingLeft: scaleSizeW(20),
        borderBottomColor: "rgba(0, 0, 0, 0.1)",
        borderBottomWidth: scaleSizeH(0.5),
        lineHeight: scaleSizeH(30),
        fontWeight: "400",
    },
    listConatiner: {
        display: "flex",
        alignItems: "center",
        // backgroundColor: "yellow",
        flexDirection: "row",
    },
    user: {
        height: scaleSizeH(50),
        width: scaleSizeW(60),
        // marginLeft: scaleSizeW(10),
        // backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    username: {
        marginTop: scaleSizeH(5),
        fontSize: scaleSizeH(8),
        fontWeight: "100",
        color: "gray"
    }
})

export default LivingFollowingList
