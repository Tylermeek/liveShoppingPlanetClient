import { color } from "@rneui/base";
import { Button, Card, Icon, Image } from "@rneui/themed";
import { Text } from "@rneui/themed";
import { PromotionalActivityInfo, getPromotionalActivity } from "axios/api/recommend";
import { chunk, uniqueId } from "lodash-es";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const PromotionalActivity: React.FC = () => {
    const [activity, setActivity] = useState<PromotionalActivityInfo>()
    useEffect(() => {
        getPromotionalActivity()
            .then((res) => {
                setActivity(res.data)
            })
    }, [])
    return <>
        <View style={{
            flex: 1,
            backgroundColor: "#A2C5C9",
            marginLeft: scaleSizeW(10),
            borderRadius: scaleSizeW(5)
        }}>
            <TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{activity?.activityName}</Text>
                    <View style={styles.subTitle}>
                        <Text style={{ fontSize: scaleSizeW(10), color: "white" }}>抢大额折扣</Text>
                        <Icon name="chevron-right" color="white" size={scaleSizeW(12)} ></Icon>
                    </View>
                </View>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
                {
                    !isEmptyArr(activity?.productList || []) &&
                    chunk(activity?.productList, 2).map((subList) => {
                        return <View key={uniqueId()} style={{ flexDirection: "row", flex: 1 }}>
                            {subList.map((product, index) => {
                                return <TouchableOpacity key={product.id} style={[styles.prodctContainer, { marginLeft: index === 1 ? 0 : scaleSizeW(10) }]} >
                                    <View style={{ height: "75%" }}>
                                        <Image source={{ uri: product.cover }} style={styles.image}></Image>
                                    </View>
                                    <Text style={styles.price}>￥{product.price} 史低!</Text>
                                </TouchableOpacity>
                            })}
                        </View>

                    })
                }
            </View>
        </View>
    </>
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: "#E36255",
        height: scaleSizeH(30),
        margin: scaleSizeW(10),
        borderRadius: scaleSizeW(3),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        color: "white",
        flex: 2,
        fontSize: scaleSizeW(12),
        textAlign: "center",
        borderRightWidth: scaleSizeW(1),
        borderStyle: "dotted",
        borderColor: "#A2C5C9"
    },
    subTitle: {
        flex: 3,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        height: scaleSizeH(20)
    },
    prodctContainer: {
        backgroundColor: "white",
        borderRadius: scaleSizeW(3),
        flex: 1,
        margin: scaleSizeW(10),
        marginTop: 0
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: scaleSizeW(3),
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    price: {
        fontSize: scaleSizeW(7),
        color: "#F3C262",
        textAlign: "center",
        backgroundColor: "#E36255",
        margin:"5%",
        borderRadius:scaleSizeW(2.5)
    }
})

export default PromotionalActivity