import { Button, color } from "@rneui/base";
import { Icon, Tab } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getGoodsDetail } from "axios/api/goods";
import GoBack from "components/GoBack";
import React, { useState } from "react";
import { ColorValue, StatusBar, StyleSheet, View } from "react-native";
import { addProThunk } from "slice/cart/cartSlice";
import { useAppDispatch } from "store/hooks";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import BuyAddButtonGroup from "./BuyAddButtonGroup";
import BuyBottomSheet from "./ProductPage/BuyBottomSheet";
import AddBottomSheet from "./ProductPage/AddBottomSheet";

export interface BannerProps {
  goodsId: number;
}

const enum IconType {
  Shop = "shop",
  CustomerService = "customerService",
  Collect = "collect",
}

interface IconInfo {
  title: string;
  value: IconType;
  iconName: string;
  color?: ColorValue;
}

const iconConfig: IconInfo[] = [
  {
    title: "店铺",
    value: IconType.Shop,
    iconName: "storefront",
    color: "#EC9A86",
  },
  { title: "客服", value: IconType.CustomerService, iconName: "support-agent" },
  { title: "收藏", value: IconType.Collect, iconName: "favorite" },
];

const BottomBanner: React.FC<BannerProps> = ({ goodsId }) => {
  const [userHasCollect, setUserHasCollect] = useState(0);
  const [isBuyVisible, setIsBuyVisible] = useState(false);
  const [isAddVisible, setIsAddVisible] = useState(false);
  const { data } = useRequest(() => getGoodsDetail({ id: goodsId }), {
    onSuccess: (res) => {
      console.log(res);
      setUserHasCollect(res.data.userHasCollect);
    },
  });
  const handlePressIcon = (iconType: IconType) => {
    // todo 处理客服、收藏、跳转店铺首页功能
    console.log("iconType", iconType);
  };

  return (
    <>
      <View style={styles.contanier}>
        <View style={styles.iconContanier}>
          {iconConfig.map((icon) => {
            return (
              <Button
                key={icon.value}
                buttonStyle={{ flexDirection: "column" }}
                color="transparent"
                onPress={() => handlePressIcon(icon.value)}
                titleStyle={{ color: "grey", fontSize: scaleSizeW(10) }}
              >
                <Icon
                  name={icon.iconName}
                  color={icon.color || "grey"}
                  size={20}
                ></Icon>
                {icon.title}
              </Button>
            );
          })}
        </View>
        <View
          style={{
            ...styles.buttonContaniner,
          }}
        >
          <View style={styles.buttonWrap}>
            <Button
              color="#EC9A86"
              title={"加入购物车"}
              radius={0}
              buttonStyle={styles.buttonLStyle}
              titleStyle={{ fontSize: scaleSizeW(13) }}
              onPress={() => setIsAddVisible(true)}
            />
          </View>
          <View style={styles.buttonWrap}>
            <Button
              color="#E36255"
              title={"立即购买"}
              radius={0}
              buttonStyle={styles.buttonRStyle}
              titleStyle={{ fontSize: scaleSizeW(13) }}
              onPress={() => setIsBuyVisible(true)}
            />
          </View>
        </View>
        {data?.data && (
          <>
            <BuyBottomSheet
              isVisible={isBuyVisible}
              onIsVisible={setIsBuyVisible}
              goodDetail={data?.data!}
            />
            <AddBottomSheet
              isVisible={isAddVisible}
              onIsVisible={setIsAddVisible}
              goodDetail={data?.data!}
            />
          </>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contanier: {
    height: scaleSizeH(44),
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: scaleSizeH(0.5),
  },
  iconContanier: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
  buttonWrap: { flex: 1, justifyContent: "center" },
  buttonContaniner: {
    width: scaleSizeW(180),
    flexDirection: "row",
    marginRight: scaleSizeW(10),
  },
  buttonLStyle: {
    // width: scaleSizeW(90),
    borderTopLeftRadius: scaleSizeW(25),
    borderBottomLeftRadius: scaleSizeW(25),
  },
  buttonRStyle: {
    width: scaleSizeW(90),
    borderTopRightRadius: scaleSizeW(25),
    borderBottomRightRadius: scaleSizeW(25),
  },
});

export default BottomBanner;
