import { getRecommendlist } from "axios/api/recommend";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { isEmptyArr, randomArr } from "utlis/method";
import ContentCard from "./ContentCard";
import { chunk, uniqueId } from "lodash-es";
import { scaleSizeW } from "utlis/scaleSize";
import { LiveInfo, ProductInfo } from "types/info";

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
                    chunk(list, 5).map((subList, index) => {
                        return (
                            <View style={[styles.column, { marginLeft: index === 1 ? 0 : scaleSizeW(10) }]} key={uniqueId()} >
                                {
                                    subList.map((content) => {
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
    }
})

export default RecommendList
