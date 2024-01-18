import { Icon, Image, Text } from "@rneui/base";
import { chunk } from "lodash-es";
import React from "react";
import { ImageURISource, StyleSheet, TouchableOpacity, View } from "react-native";
import { SvgUri } from "react-native-svg";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface FuncInfo {
    name: string,
    title: string,
    icon: string
}

export type FuncList = FuncInfo[]

const funcList: FuncList = [
    {
        name: "PopularProduct",
        title: "热门商品",
        icon: `https://img.icons8.com/color/48/mando.png`
    },
    {
        name: "PointsParadise",
        title: "积分乐园",
        icon: "https://img.icons8.com/color/48/baby-yoda.png"
    },
    {
        name: "Supermarket",
        title: "超市百货",
        icon: "https://img.icons8.com/color/48/morpheus.png"
    },
    {
        name: "logistics",
        title: "物流",
        icon: "https://img.icons8.com/color/48/neo.png"
    },
    {
        name: "Categories",
        title: "商品分类",
        icon: "https://img.icons8.com/color/48/stormtrooper.png"
    },
    {
        name: "PopularProduct",
        title: "热门商品",
        icon: "https://img.icons8.com/color/48/deadpool.png"
    },
    {
        name: "PointsParadise",
        title: "积分乐园",
        icon: "https://img.icons8.com/color/48/harley-quinn-dc.png"
    },
    {
        name: "Supermarket",
        title: "超市百货",
        icon: "https://img.icons8.com/color/48/martian.png"
    },
    {
        name: "logistics",
        title: "物流",
        icon: "https://img.icons8.com/color/48/r2-d2.png"
    },
    {
        name: "Categories",
        title: "商品分类",
        icon: "https://img.icons8.com/color/48/agent-smith.png"
    }
]

const FuncBlock: React.FC = () => {


    const handlePress = (func: FuncInfo) => {
        console.log(`todo jump to ${func.name}`);

    }

    return <>
        <View style={styles.container}>
            {
                chunk(funcList, 5).map((subList) => {
                    return <View style={{display:"flex", flexDirection:"row"}}>
                        {
                            subList.map((func) => {
                                return <>
                                    <TouchableOpacity style={styles.funcContainer} key={func.name} onPress={() => handlePress(func)}>
                                        <Image style={{ width: scaleSizeH(30), height: scaleSizeH(30), }} source={{ uri: func.icon }}></Image>
                                        <Text style={{ fontSize: scaleSizeW(9), lineHeight: scaleSizeH(24), textAlign: "center" }}>{func.title}</Text>
                                    </TouchableOpacity>
                                </>
                            })
                        }
                    </View>
                })
            }
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        flexWrap: "wrap",
        margin: scaleSizeH(5)
    },
    funcContainer: {
        height: scaleSizeH(64),
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})

export default FuncBlock
