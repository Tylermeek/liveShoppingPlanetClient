import { Button } from "@rneui/themed";
import WaterFall from "components/WaterFall";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { handleMomentumScrollEnd, randomArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import LiveCard from "./LiveCard";
import { SearchLiveList, getSearchLiveList } from "axios/api/search";

export interface LiveListProps {
    searchContent: string
}

const LiveList: React.FC<LiveListProps> = ({ searchContent }) => {
    const [list, setList] = useState<SearchLiveList>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [isEndReached, setIsEndReached] = useState<boolean>(false)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)

    const handleGetMoreList = async () => {
        const newPageNo = pageNo + 1
        setPageNo(newPageNo)
        setLoadingMore(true);
        const res = await getSearchLiveList({ searchContent, pageNo: newPageNo });
        setList(list.concat(res.data));
        setLoadingMore(false);
    }

    const handleinitList = async () => {
        setRefreshing(true)
        const res = await getSearchLiveList({ searchContent, pageNo: pageNo });
        setRefreshing(false)
        setList(res.data);
    }

    useEffect(() => {
        handleinitList()
    }, [])
    return <>
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            onScroll={(event) => handleMomentumScrollEnd(event, isEndReached, setIsEndReached)}
            scrollEventThrottle={50}
        >
            {
                refreshing
                    ? <Button type="clear" loading size="sm" />
                    : <WaterFall
                        list={list}
                        isEndReached={isEndReached}
                        loadingMore={loadingMore}
                        ContentCard={LiveCard}
                        columLen={1}
                        updateListCb={setList}
                        getMoreList={handleGetMoreList}
                    />
            }
        </ScrollView>
    </>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderTopLeftRadius: scaleSizeW(10),
        borderTopRightRadius: scaleSizeW(10),
    },
    tabConatiner: {
        height: scaleSizeH(25),
    },
    TabItemConatiner: {
        height: scaleSizeH(25),
    },
    TabItemTitle: {
        lineHeight: scaleSizeH(25),
        fontSize: scaleSizeH(10),
        paddingVertical: 0,
        paddingHorizontal: 0
    },
    TabItemButton: {
        padding: 0,
        paddingHorizontal: 0
    },
    tabViewContainer: {
        width: '100%',
        backgroundColor: "white",
        flex: 1
    }
})

export default LiveList
