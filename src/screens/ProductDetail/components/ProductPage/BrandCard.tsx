import { Avatar, Divider, Text } from "@rneui/themed";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BrandInfo } from "types/info";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface BrandCardProps {
  brandInfo: BrandInfo;
}

const RateLevel: React.FC<{ num: number }> = ({ num }) => {
  if (num > 4.85) {
    return (
      <Text style={{ fontSize: scaleSizeW(10), color: "#E36235" }}> 高</Text>
    );
  }
  if (num > 4.8) {
    return (
      <Text style={{ fontSize: scaleSizeW(10), color: "#EC9A86" }}>平</Text>
    );
  } else {
    return (
      <Text style={{ fontSize: scaleSizeW(10), color: "#E36235" }}>低</Text>
    );
  }
};

const BrandCard: React.FC<BrandCardProps> = ({ brandInfo }) => {
  // todo 跳转商家主页功能
  return (
    brandInfo.desc && (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            size={40}
            source={{ uri: brandInfo?.picUrl }}
            avatarStyle={{ borderRadius: scaleSizeW(10) }}
          />
          <Text
            h2
            style={{ marginLeft: scaleSizeW(5), fontSize: scaleSizeW(13) }}
          >
            {brandInfo.name}
          </Text>
        </View>
        <Text h3 style={{ marginTop: scaleSizeW(10), textAlign: "center" }}>
          {brandInfo.desc}
        </Text>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginTop: scaleSizeH(10),
    padding: scaleSizeW(10),
  },
  detailContainer: {
    width: scaleSizeW(70),
    alignItems: "center",
  },
  detailTitle: {
    fontSize: scaleSizeW(10),
    color: "rgba(153, 153, 153, 1)",
  },
  rateContainer: {
    flexDirection: "row",
    width: scaleSizeW(100),
    justifyContent: "space-evenly",
  },
  rateTitle: {
    fontSize: scaleSizeW(10),
    color: "rgba(153, 153, 153, 1)",
  },
  rateNum: {
    fontSize: scaleSizeW(10),
  },
  buttonTitle: {
    width: scaleSizeW(70),
    color: "black",
    fontSize: scaleSizeW(10),
  },
});

export default BrandCard;
