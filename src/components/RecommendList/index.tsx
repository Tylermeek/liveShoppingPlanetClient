import { Button, Divider, Text } from "@rneui/themed";
import { SortTypes, getSearchProductList } from "axios/api/search";
import WaterFall from "components/WaterFall";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProductCard from "screens/SearchResultList/components/ProductList/ProductCard";
import { ProductInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface RecommendProductListProps {
    productName?: string
    isEndReached: boolean
}

const RecommendProductList: React.FC<RecommendProductListProps> = ({ productName, isEndReached }) => {
    const [list, setList] = useState<ProductInfo[]>([])
    const [pageNo, setPageNo] = useState<number>(1)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const getList = async () => {
        setLoading(true)
        // todo 迁移接口到统一的获取推荐商品列表
        const res = await getSearchProductList({ searchContent: "test", sortType: SortTypes.Default, pageNo })
        setList(res.data)
        setLoading(false)
    }

    const getMoreList = async () => {
        setLoadingMore(true)
        setPageNo(pageNo + 1)
        const res = await getSearchProductList({ searchContent: "test", sortType: SortTypes.Default, pageNo: pageNo + 1 })
        setList(list.concat(res.data))
        setLoadingMore(false)
    }

    useEffect(() => {
        getList()
    }, [])
    return <>

        <View style={{ alignItems: "center", marginTop: scaleSizeH(10) }}>
            <Text style={{ fontSize: scaleSizeW(13), fontWeight: "700" }}>更多推荐</Text>
        </View>
        <Divider style={{ marginTop: scaleSizeH(10) }} />

        {
            loading ?
                <Button type="clear" loading size="sm" />
                :
                <WaterFall
                    list={list}
                    isEndReached={isEndReached}
                    loadingMore={loadingMore}
                    updateListCb={setList}
                    getMoreList={getMoreList}
                    ContentCard={ProductCard}
                />
        }

    </>
}

const styles = StyleSheet.create({

})

export default RecommendProductList
