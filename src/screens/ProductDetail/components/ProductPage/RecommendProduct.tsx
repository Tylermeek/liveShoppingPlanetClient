import { Button, Divider, Text } from "@rneui/themed";
import { getRelateGoods } from "axios/api/goods";
import WaterFall from "components/WaterFall";
import { chunk } from "lodash-es";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ProductCard from "screens/SearchResultList/components/ProductList/ProductCard";
import { IRelatedGood } from "types/goods";
import { ProductInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface RecommendProductProps {
  goodId: number;
  isEndReached: boolean;
}

const RecommendProduct: React.FC<RecommendProductProps> = ({
  goodId,
  isEndReached,
}) => {
  const [coloumLists, setColoumLists] = useState<IRelatedGood[][]>([[], []]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const getList = async () => {
    setLoading(true);
    const res = await getRelateGoods(goodId);
    setColoumLists(chunk(res.data.list, Math.floor(res.data.list.length / 2)));
    setLoading(false);
  };

  // todo 获取更多没法实现
  const getMoreList = async () => {
    setLoadingMore(true);
    setPageNo(pageNo + 1);
    const res = await getRelateGoods(goodId);
    const tempLists = chunk(
      res.data.list,
      Math.floor(res.data.list.length / 2)
    );
    setColoumLists((preList) => [
      [...preList[0], ...tempLists[0]],
      [...preList[1], ...tempLists[1]],
    ]);
    setLoadingMore(false);
  };

  useEffect(() => {
    getList();
  }, []);
  return (
    <>
      <View style={{ alignItems: "center", marginTop: scaleSizeH(10) }}>
        <Text style={{ fontSize: scaleSizeW(13), fontWeight: "700" }}>
          更多推荐
        </Text>
      </View>
      <Divider style={{ marginTop: scaleSizeH(10) }} />

      {loading ? (
        <Button type="clear" loading size="sm" />
      ) : (
        <WaterFall
          coloumLists={coloumLists}
          isEndReached={isEndReached}
          loadingMore={loadingMore}
          updateListCb={setColoumLists}
          getMoreList={getMoreList}
          ContentCard={ProductCard}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default RecommendProduct;
