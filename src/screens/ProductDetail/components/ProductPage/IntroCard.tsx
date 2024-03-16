import { Divider, Icon, Text } from "@rneui/themed";
import RowFlexConatiner from "components/RowFlexContainer";
import React from "react";
import { StyleSheet, View } from "react-native";
import { IGoodDetail } from "types/goods";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

interface IntroCardProps {
  goodDetail: IGoodDetail;
}

const IntroCard: React.FC<IntroCardProps> = ({ goodDetail }) => {
  // todo 分享按钮
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text
          style={{ color: "rgba(51, 51, 51, 1)", fontSize: scaleSizeW(13) }}
          numberOfLines={2}
          ellipsizeMode="clip"
        >
          {goodDetail.info.name}
        </Text>
        <RowFlexConatiner containerStyle={{ justifyContent: "flex-start" }}>
          <Text
            style={{
              color: "#E36235",
              fontSize: scaleSizeW(18),
              marginTop: scaleSizeW(5),
            }}
          >
            ￥{goodDetail?.info.retailPrice}
          </Text>
          <Text
            style={{
              color: "grey",
              fontSize: scaleSizeW(12),
              marginTop: scaleSizeW(5),
              marginLeft: scaleSizeW(5),
              textDecorationLine: "line-through",
            }}
          >
            ￥{goodDetail?.info.counterPrice}
          </Text>
        </RowFlexConatiner>
        {/* <View style={styles.subTitleContainer}>
          <Text style={styles.subTitle}>月销:{goodDetail.sold}</Text>
        </View> */}
      </View>
      <View
        style={{ backgroundColor: "transparent", marginTop: scaleSizeW(10) }}
      >
        {/* <View style={styles.list}>
          <Icon name="local-shipping" style={{ marginRight: scaleSizeW(10) }} />
          <Text style={styles.listItem}>
            快递邮费: {goodDetail?.expressgoodDetail.cost}
          </Text>
          <Text style={styles.listItem}>
            {goodDetail?.expressgoodDetail.source}
          </Text>
        </View> */}
        {/* <Divider style={{ marginLeft: scaleSizeW(5), marginRight: scaleSizeW(5) }} /> */}
        {/* <View style={[styles.list, { marginTop: scaleSizeW(2.5) }]}>
          <Icon name="verified" style={{ marginRight: scaleSizeW(10) }} />
          {goodDetail?.supportServices.map((service, index) => {
            return (
              <View
                key={service}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                {index !== 0 && <Text style={styles.listItem}>|</Text>}
                <Text style={styles.listItem}>{service}</Text>
              </View>
            );
          })}
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    padding: scaleSizeW(10),
    backgroundColor: "white",
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scaleSizeW(5),
  },
  subTitle: {
    color: "rgba(153, 153, 153, 1)",
    fontSize: scaleSizeW(10),
  },
  list: {
    height: scaleSizeH(50),
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
    padding: scaleSizeW(10),
  },
  listItem: {
    padding: scaleSizeW(5),
    fontSize: scaleSizeW(10),
  },
});

export default IntroCard;
