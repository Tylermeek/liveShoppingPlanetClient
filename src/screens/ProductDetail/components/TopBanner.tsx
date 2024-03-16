import { Button, color } from "@rneui/base";
import { Badge, Icon, Tab } from "@rneui/themed";
import GoBack from "components/GoBack";
import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { useAppSelector } from "store/hooks";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface BannerProps {
  activeTab: number;
  setActiveTab: (activeTab: number) => void;
}

const tabConfig = [
  { title: "商品", value: "product" },
  { title: "详情", value: "detail" },
  { title: "评价", value: "comment" },
];

const TopBanner: React.FC<BannerProps> = ({ activeTab, setActiveTab }) => {
  const { cartTotal } = useAppSelector((state) => state.cartInfo);
  const handlePressCart = () => {
    // todo 跳转购物车功能
    console.log("cart");
  };
  return (
    <>
      <View style={styles.contanier}>
        <GoBack />
        <Tab
          value={activeTab}
          onChange={setActiveTab}
          disableIndicator
          style={{ flex: 1, marginBottom: scaleSizeH(5) }}
          buttonStyle={{}}
        >
          {tabConfig.map((item) => {
            return (
              <Tab.Item
                key={item.value}
                title={item.title}
                titleStyle={(active) => {
                  return {
                    color: active ? "#E36255" : "rgba(153, 153, 153, 1)",
                    ...styles.tabTitle,
                  };
                }}
              />
            );
          })}
        </Tab>
        <View style={{ marginRight: scaleSizeW(10) }}>
          <Button
            style={{ backgroundColor: "transparent" }}
            color="transparent"
            onPress={handlePressCart}
          >
            <Icon name="shopping-cart" color="#F3C262"></Icon>
          </Button>
          <Badge
            status="primary"
            value={cartTotal.goodsCount > 99 ? "99+" : cartTotal.goodsCount}
            containerStyle={{
              position: "absolute",
              top: "10%",
              right: "10%",
              width: scaleSizeW(10),
              height: scaleSizeW(10),
            }}
            textStyle={{ fontSize: scaleSizeW(6) }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contanier: {
    height: scaleSizeH(44) + (StatusBar.currentHeight || 0),
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
    borderBottomWidth: scaleSizeH(0.5),
  },
  tabTitle: {
    // height: scaleSizeH(44),
    fontSize: scaleSizeW(12),
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
});

export default TopBanner;
