import { Icon, Image, Text } from "@rneui/base";
import React from "react";
import { ImageURISource, StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const FuncList = [
    {
        name: "PopularProduct",
        title: "热门商品",
        icon:  `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M6,10c0-2.209,1.791-4,4-4h28c2.209,0,4,1.791,4,4v28c0,2.209-1.791,4-4,4H10c-2.209,0-4-1.791-4-4V10z"></path><path fill="#1C1302" d="M9,9v30h30V9H9z M22.014,19.174h-5v3.643h4.463v2.383h-4.463V31h-2.871V16.781h7.871V19.174z M32.619,31h-2.295l-1.494-6.113L27.336,31h-2.305l-2.188-10.566H25.5l0.938,5.938l1.406-5.938h1.963l1.406,5.928l0.947-5.928h2.646L32.619,31z"></path>
        </svg>`
    },
    // {
    //     name: "PointsParadise",
    //     title: "积分乐园",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "Supermarket",
    //     title: "超市百货",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "logistics",
    //     title: "物流",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "Categories",
    //     title: "商品分类",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "PopularProduct",
    //     title: "热门商品",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "PointsParadise",
    //     title: "积分乐园",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "Supermarket",
    //     title: "超市百货",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "logistics",
    //     title: "物流",
    //     icon: "http://dummyimage.com/40x40"
    // },
    // {
    //     name: "Categories",
    //     title: "商品分类",
    //     icon: "http://dummyimage.com/40x40"
    // }
]

const FuncBlock: React.FC = () => {

    return <>
        <View style={styles.container}>
            {
                FuncList.map((func) => {
                    return <>
                        <TouchableOpacity style={styles.funcContainer} key={func.name}>
                            {func.icon}
                            <Text style={{ fontSize: scaleSizeW(9), lineHeight: scaleSizeH(24), textAlign: "center" }}>{func.title}</Text>
                        </TouchableOpacity>
                    </>
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
        flexWrap:"wrap",
        marginTop:scaleSizeH(10)
    },
    funcContainer: {
        height: scaleSizeH(64),
        width: "15%",
        marginTop: scaleSizeH(10),
        marginLeft:"2.5%",
        marginRight:"2.5%",
        alignItems:"center",
        justifyContent:"center"
    }
})

export default FuncBlock
