import { getRecommendlist } from "axios/api/recommend";
import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { isEmptyArr, randomArr } from "utlis/method";
import ContentCard from "./ContentCard";
import { chunk, uniqueId } from "lodash-es";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LiveInfo, ProductInfo } from "types/info";
import { Button, Text } from "@rneui/themed";

export interface RecommendListProps {
    isEndReached: boolean
}

const RecommendList: React.FC<RecommendListProps> = ({ isEndReached }) => {
    const [list, setList] = useState<(LiveInfo | ProductInfo)[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const handleGetMoreList = async (pageNo: number) => {
        const res = await getRecommendlist(pageNo);
        const randomList: (LiveInfo | ProductInfo)[] = [...res.data.liveList, ...res.data.productList];
        randomArr(randomList);
        setList(list.concat(randomList));
    }

    const handleinitList = async () => {
        const res = await getRecommendlist(1);
        const randomList: (LiveInfo | ProductInfo)[] = [...res.data.liveList, ...res.data.productList];
        randomArr(randomList);
        setList(randomList);
    }

    useEffect(() => {
        if (isEndReached) {
            console.log("isEndReached");
            // TODO loadMore
            const newPageNo = pageNo + 1
            setPageNo(newPageNo)
            setRefreshing(true);
            handleGetMoreList(newPageNo).finally(() => {
                setRefreshing(false);
            })

        }

    }, [isEndReached])


    useEffect(() => {
        handleinitList()
    }, [])

    // TODO 抽离瀑布流组件
    return <>
        <View style={styles.container}>
            {
                !isEmptyArr(list) &&
                <>{(
                    chunk(list, Math.floor(list.length / 2))).map((subList, columnIndex) => {
                        return (
                            <View style={[styles.column, { marginLeft: columnIndex === 1 ? 0 : scaleSizeW(10) }]} key={columnIndex} >
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
            {
                refreshing
                    ? <Button type="clear" loading size="sm"/>
                    : <Text style={{ fontSize: scaleSizeH(14) }}>—— 到底啦 ——</Text>

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
    },
    endLine: {
        height: scaleSizeH(30),
        marginBottom: scaleSizeW(10),
        justifyContent: "center",
        alignItems: "center"
    }
})

export default RecommendList
