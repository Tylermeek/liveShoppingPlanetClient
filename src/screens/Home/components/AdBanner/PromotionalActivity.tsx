import { useNavigation } from "@react-navigation/native";
import { Icon, Image, Skeleton } from "@rneui/themed";
import { Text } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getGoodsList } from "axios/api/goods";
import { chunk, uniqueId } from "lodash-es";
import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Views } from "types/navigation";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

const PromotionalActivity: React.FC = () => {
  // TODO 活动商品跳转功能
  const navigation = useNavigation();

  const { data, loading } = useRequest(getGoodsList, {
    defaultParams: [{ isHot: true, limit: 4 }],
  });
  const handlePressProduct = (goodsId: number) => {
    // console.log(contentInfo.title, contentInfo.type);
    navigation.navigate(Views.ProductDetail, { goodsId });
  };
  return (
    <>
      {loading ? (
        <Skeleton animation="wave" style={styles.container} />
      ) : (
        <View style={styles.container}>
          <TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>人气推荐</Text>
              <View style={styles.subTitle}>
                <Text style={{ fontSize: scaleSizeW(10), color: "white" }}>
                  抢大额折扣
                </Text>
                <Icon
                  name="chevron-right"
                  color="white"
                  size={scaleSizeW(12)}
                ></Icon>
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            {!isEmptyArr(data?.data.list || []) &&
              chunk(data?.data.list, 2).map((subList) => {
                return (
                  <View
                    key={uniqueId()}
                    style={{ flexDirection: "row", flex: 1 }}
                  >
                    {subList.map((product, index) => {
                      return (
                        <TouchableOpacity
                          key={product.id}
                          style={[
                            styles.prodctContainer,
                            { marginLeft: index === 1 ? 0 : scaleSizeW(10) },
                          ]}
                          onPress={() => handlePressProduct(product.id)}
                        >
                          <View style={{ height: "100%" }}>
                            <Image
                              source={{ uri: product.picUrl }}
                              style={styles.image}
                            ></Image>
                          </View>
                          <View style={styles.priceContainer}>
                            <Text style={styles.price}>
                              ￥{product.retailPrice} 史低!
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: scaleSizeH(200),
    backgroundColor: "#A2C5C9",
    marginLeft: scaleSizeW(10),
    borderRadius: scaleSizeW(5),
  },
  titleContainer: {
    backgroundColor: "#E36255",
    height: scaleSizeH(30),
    margin: scaleSizeW(10),
    borderRadius: scaleSizeW(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    height: scaleSizeH(20),
    color: "white",
    flex: 2,
    fontSize: scaleSizeW(12),
    textAlign: "center",
    lineHeight: scaleSizeH(20),
    borderRightWidth: scaleSizeW(1),
    borderStyle: "dotted",
    borderColor: "#A2C5C9",
  },
  subTitle: {
    flex: 3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    height: scaleSizeH(20),
    lineHeight: scaleSizeH(20),
  },
  prodctContainer: {
    backgroundColor: "white",
    borderRadius: scaleSizeW(3),
    flex: 1,
    margin: scaleSizeW(10),
    marginTop: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: scaleSizeW(3),
  },
  priceContainer: {
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    left: 50,
    bottom: 25,
    transform: [{ translateX: -50 }],
  },
  price: {
    fontSize: scaleSizeW(7),
    color: "black",
    textAlign: "center",
    backgroundColor: "#F3C262",
    borderRadius: scaleSizeW(2.5),
    padding: scaleSizeW(1),
  },
});

export default PromotionalActivity;
