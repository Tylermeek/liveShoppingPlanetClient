import { Image, Skeleton } from "@rneui/themed";
import { CoverList, getProductCoverList } from "axios/api/goods";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Carousel from "react-native-reanimated-carousel";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH } from "utlis/scaleSize";

interface CoverSwipperProps {
  goodsGallery?: string[];
}

const CoverSwipper: React.FC<CoverSwipperProps> = ({ goodsGallery = [] }) => {
  // todo 切换为手动切换且可预览的图片
  const [coverList, setCoverList] = useState<CoverList>([]);
  const containerWidth = Dimensions.get("window").width;

  return isEmptyArr(goodsGallery) ? (
    <Skeleton
      animation="pulse"
      width={containerWidth}
      height={scaleSizeH(320)}
    />
  ) : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Carousel
        loop
        width={containerWidth}
        height={scaleSizeH(320)}
        autoPlay={false}
        data={goodsGallery}
        scrollAnimationDuration={2000}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item }}
            style={{ height: "100%", width: "100%" }}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({});

export default CoverSwipper;
