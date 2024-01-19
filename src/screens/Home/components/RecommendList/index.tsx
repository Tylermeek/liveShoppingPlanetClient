import { getRecommendlist } from "axios/api/recommend";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { isEmptyArr, randomArr } from "utlis/method";
import ContentCard from "./ContentCard";
import { chunk, uniqueId } from "lodash-es";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LiveInfo, ProductInfo } from "types/info";
import { Text } from "@rneui/themed";

export interface RecommendListProps {
    list: (LiveInfo | ProductInfo)[]
}

const RecommendList: React.FC<RecommendListProps> = ({ list }) => {
    // TODO 抽离瀑布流组件
    return <>
        <View style={styles.container}>
            {
                !isEmptyArr(list) &&
                <>{
                    chunk(list, 5).map((subList, columnIndex) => {
                        return (
                            <View style={[styles.column, { marginLeft: columnIndex === 1 ? 0 : scaleSizeW(10) }]} key={uniqueId()} >
                                {
                                    subList.map((content, index) => {
                                        return content &&
                                            <ContentCard key={content.id} contentInfo={content}></ContentCard>
                                    })
                                }
                            </View>
                        )
                    })

                }</>
            }
        </View>
        <View style={styles.endLine}>
            <Text style={{ fontSize: scaleSizeH(14) }}>——— 到底啦 ——</Text>
        </View>
    </>
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "stretch",
    },
    column: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        margin: scaleSizeW(10),
        // marginLeft:0,
    },
    endLine: {
        height: scaleSizeH(30),
        marginBottom: scaleSizeW(10),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default RecommendList
