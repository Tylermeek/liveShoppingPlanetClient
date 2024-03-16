import { getGoodsDetail } from "axios/api/goods";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import CoverSwipper from "./CoverSwipper";
import IntroCard from "./IntroCard";
import RecommendProduct from "./RecommendProduct";
import { handleMomentumScrollEnd } from "utlis/method";
import { useRequest } from "ahooks";
import BrandCard from "./BrandCard";

interface ProductInfoProps {
  goodsId: number;
}
const ProductPage: React.FC<ProductInfoProps> = ({ goodsId }) => {
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const { data } = useRequest(() => getGoodsDetail({ id: goodsId }));

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(event) =>
          handleMomentumScrollEnd(event, isEndReached, setIsEndReached)
        }
        scrollEventThrottle={50}
      >
        <CoverSwipper goodsGallery={data?.data?.info.gallery} />
        {data?.data && (
          <>
            <IntroCard goodDetail={data.data} />
            <BrandCard brandInfo={data.data.brand} />
            <RecommendProduct
              goodId={data.data.info.id}
              isEndReached={isEndReached}
            ></RecommendProduct>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default ProductPage;
