import { Button, Image, Text } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getOrderList } from "axios/api/order";
import React from "react";
import { useEffect, useState } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { IOrder } from "types/order";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export default function RecentOrder() {
  const containerWidth = Dimensions.get("window").width - 4 * scaleSizeW(10);
  const { data } = useRequest(getOrderList, {
    defaultParams: [{ showType: 0 }],
  });
  const handlePress = (order: IOrder) => {
    console.log("press", order);
  };

  return (
    data?.data && <View style={{ backgroundColor: "#ebebeb", borderRadius: scaleSizeW(10) }}>
      <Carousel
        loop
        width={containerWidth}
        height={scaleSizeW(60)}
        autoPlay
        data={data?.data?.list || []}
        pagingEnabled={false}
        snapEnabled
        vertical
        scrollAnimationDuration={1500}
        renderItem={({ item, index }) => {
          const firstGood = item.goodsList?.[0];
          if (firstGood) {
            return (
              <TouchableOpacity
                key={item.id}
                style={{ flex: 1 }}
                onPress={() => handlePress(item)}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignItems: "center",
                      height: scaleSizeW(60),
                      marginLeft: scaleSizeW(10),
                    }}
                  >
                    <View
                      style={{ width: scaleSizeW(40), height: scaleSizeW(40) }}
                    >
                      <Image
                        source={{
                          uri:
                            firstGood.picUrl ||
                            "https://randomuser.me/api/portraits/men/36.jpg",
                        }}
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: scaleSizeW(5),
                        }}
                      />
                    </View>
                    {/* 目前接口无法实现物流状态 */}
                    <View style={{ marginLeft: scaleSizeW(5) }}>
                      <Text style={{ fontSize: scaleSizeW(12) }}>
                        {firstGood.goodsName}
                      </Text>
                      {/* <Text style={{ fontSize: scaleSizeW(10) }}>
                        {item.status}
                      </Text> */}
                    </View>
                    {/* <View style={{ marginLeft: scaleSizeW(5) }}>
                      <Text style={{ fontSize: scaleSizeW(12) }}>
                        {item.updateTime}
                      </Text>
                    </View> */}
                  </View>
                  <View style={{ marginRight: scaleSizeW(10) }}>
                    <Button
                      title="查看"
                      type="outline"
                      size="sm"
                      radius="lg"
                      titleStyle={{
                        fontSize: scaleSizeW(11),
                        paddingHorizontal: scaleSizeW(5),
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          } else {
            return <></>;
          }
        }}
        style={{ borderRadius: scaleSizeW(5) }}
      />
    </View>
  );
}
