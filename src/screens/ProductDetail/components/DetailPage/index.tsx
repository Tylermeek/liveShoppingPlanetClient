import { useRequest } from "ahooks";
import { getGoodsDetail } from "axios/api/goods";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
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
      setGoodDetail(res?.data.info.detail);
    },
  });
  return (
    // <ScrollView>
    //   {list.map((img, index) => {
    //     return (
    //       <Image
    //         key={`${index}${img}`}
    //         source={{ uri: img }}
    //         style={{ width: "100%", height: scaleSizeH(320) }}
    //       />
    //     );
    //   })}
    // </ScrollView>
    <RenderHtml contentWidth={width} source={(goodDetail as any) || ""} />
  );
};

const styles = StyleSheet.create({});

export default DetailPage;
