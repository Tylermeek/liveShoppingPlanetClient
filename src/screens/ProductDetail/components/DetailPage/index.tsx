import { Skeleton } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getGoodsDetail } from "axios/api/goods";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useWindowDimensions } from "react-native";
import RenderHtml, { HTMLSource } from "react-native-render-html";

interface DetailPageProps {
  goodsId: number;
}

const DetailPage: React.FC<DetailPageProps> = ({ goodsId }) => {
  const [goodDetail, setGoodDetail] = useState<string>();
  const { width } = useWindowDimensions();
  const { loading } = useRequest(() => getGoodsDetail({ id: goodsId }), {
    onSuccess: (res) => {
      console.log(res?.data.info.detail);
      setGoodDetail(res?.data.info.detail);
    },
  });
  return (
    <ScrollView>
      {loading ? (
        <Skeleton width={300} height={300} />
      ) : (
        <RenderHtml
          contentWidth={width}
          source={{ html: (goodDetail as any) || "" }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({});

export default DetailPage;
