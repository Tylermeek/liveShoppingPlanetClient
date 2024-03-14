import { Image, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { ContentCardProps } from "../../../../components/WaterFall";
import { isEmptyArr } from "utlis/method";
import { Icon } from "@rneui/base";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Views } from "types/config";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ISearchGood } from "types/search";

export interface CardProps extends ContentCardProps {
  contentInfo: ISearchGood;
  bindRef?: Function;
}

const ProductCard: React.FC<CardProps> = ({ contentInfo, bindRef = null }) => {
  const route = useRoute();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handlePressProduct = () => {
    console.log(contentInfo.name, contentInfo.id);
    if (route.name === Views.ProductDetail) {
      // 如果是商品详情页点击其他商品，那么久必须要使用push，因为是在同一个screen下
      navigation.push(Views.ProductDetail, { productId: contentInfo.id });
    } else
      navigation.navigate(Views.ProductDetail, { productId: contentInfo.id });
  };
  //   const handlePressShop = () => {
  //     console.log(contentInfo.shopInfo.name);
  //   };

  return (
    <>
      <TouchableOpacity
        ref={(ref) => bindRef && bindRef(ref)}
        style={[styles.container, { height: scaleSizeH(250) }]}
        onPress={handlePressProduct}
      >
        <View style={{ flex: 1 }}>
          <Image
            source={{ uri: contentInfo.picUrl }}
            style={styles.cover}
          ></Image>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            {/* {contentInfo.activity && (
              <Text style={styles.activity}>{contentInfo.activity}</Text>
            )} */}
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="clip">
              {contentInfo.name}
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginBottom: scaleSizeW(2.5) }}>
            {/* {!isEmptyArr(contentInfo.features || []) &&
              contentInfo.features?.map((spec, index) => {
                return (
                  <Text key={spec} style={styles.features}>
                    {index !== 0 && " |"} {spec}
                  </Text>
                );
              })} */}
            <Text style={styles.features}>{contentInfo.brief}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginBottom: scaleSizeW(2.5),
            }}
          >
            <Text style={{ fontSize: scaleSizeW(11), color: "red" }}>
              ￥{contentInfo.counterPrice}
            </Text>
            {/* <Text
              style={{
                fontSize: scaleSizeW(7),
                color: "grey",
                marginLeft: scaleSizeW(10),
              }}
            >
              {contentInfo.sold}+人付款
            </Text> */}
          </View>
          {/* <View style={styles.shopInfo}>
            <TouchableOpacity
              style={styles.shopButton}
              onPress={handlePressShop}
            >
              <Text style={styles.shopTitle}>{contentInfo.shopInfo.name}</Text>
              <Icon name="chevron-right" size={scaleSizeW(8)}></Icon>
            </TouchableOpacity>
          </View> */}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: scaleSizeW(10),
    backgroundColor: "white",
    borderRadius: scaleSizeW(5),
    display: "flex",
  },
  cover: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: scaleSizeW(5),
    borderTopRightRadius: scaleSizeW(5),
  },
  infoContainer: {
    padding: scaleSizeH(5),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: scaleSizeW(2.5),
  },
  activity: {
    height: scaleSizeH(15),
    fontSize: scaleSizeW(9),
    lineHeight: scaleSizeH(15),
    backgroundColor: "#E36235",
    color: "white",
    fontWeight: "700",
    borderRadius: scaleSizeW(5),
    paddingLeft: scaleSizeW(2),
    paddingRight: scaleSizeW(2),
    marginRight: scaleSizeW(5),
  },
  title: {
    flex: 1,
    fontSize: scaleSizeW(10.5),
    lineHeight: scaleSizeH(15),
    fontWeight: "400",
  },
  features: {
    height: scaleSizeH(10),
    fontSize: scaleSizeW(7),
    color: "grey",
  },
  shopInfo: {
    flexDirection: "row",
  },
  shopButton: {
    backgroundColor: "#e3e6e8",
    flexDirection: "row",
    alignItems: "center",
    padding: scaleSizeW(1.5),
    paddingLeft: scaleSizeW(5),
    paddingRight: scaleSizeW(5),
    borderRadius: scaleSizeW(10),
    height: scaleSizeH(15),
  },
  shopTitle: {
    fontSize: scaleSizeW(8),
    color: "#70757a",
    marginRight: scaleSizeW(2.5),
    lineHeight: scaleSizeH(15),
    height: scaleSizeH(15),
  },
});

export default ProductCard;
