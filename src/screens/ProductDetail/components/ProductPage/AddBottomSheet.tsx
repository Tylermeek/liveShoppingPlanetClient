import { View, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { BottomSheet, Image, Text } from "@rneui/themed";
import BuyAddButtonGroup from "../BuyAddButtonGroup";
import NumInput from "components/NumInput";
import RowFlexConatiner from "components/RowFlexContainer";
import { scaleSizeW } from "utlis/scaleSize";
import { IGoodDetail } from "types/goods";
import AddButton from "../AddButton";

export default function BuyBottomSheet({
  isVisible,
  onIsVisible,
  goodDetail,
  type = "default",
}: {
  isVisible: boolean;
  onIsVisible: (isVisible: boolean) => void;
  goodDetail: IGoodDetail;
  type?: string;
}) {
  const [selectGoodsId, setSelectGoodsId] = useState<number>(
    goodDetail.info.id
  );
  const [num, setNum] = useState(1);

  return (
    <BottomSheet
      modalProps={{}}
      isVisible={isVisible}
      containerStyle={{}}
      onBackdropPress={() => onIsVisible(false)}
    >
      <TouchableOpacity
        style={{ height: 200 }}
        onPress={() => onIsVisible(false)}
      ></TouchableOpacity>
      <View style={styles.contentContainer}>
        <Text h2 style={{ color: "#E36235" }}>
          ￥{goodDetail.info.retailPrice}
        </Text>
        {goodDetail.specificationList.map((spec, index) => (
          <View key={index} style={{ marginTop: scaleSizeW(10) }}>
            <Text h3>{spec.name}</Text>
            {spec.valueList?.map((specVal) => (
              <TouchableOpacity
                key={specVal.id}
                onPress={() => setSelectGoodsId(specVal.goodsId!)}
              >
                <RowFlexConatiner
                  containerStyle={{
                    ...styles.specVal,
                    backgroundColor:
                      specVal.goodsId === goodDetail.info.id
                        ? "#EC9A86"
                        : "#DDDDDD",
                  }}
                >
                  <View
                    style={{ width: scaleSizeW(25), height: scaleSizeW(25) }}
                  >
                    <Image
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: scaleSizeW(5),
                      }}
                      source={{
                        uri:
                          specVal.picUrl ||
                          "https://randomuser.me/api/portraits/men/36.jpg",
                      }}
                    />
                  </View>
                  <Text h4 style={{ marginLeft: scaleSizeW(10) }}>
                    {specVal.value}
                  </Text>
                </RowFlexConatiner>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <RowFlexConatiner
          containerStyle={{
            justifyContent: "space-between",
            marginTop: scaleSizeW(10),
          }}
        >
          <RowFlexConatiner>
            <Text h3>数量</Text>
            <Text h4 style={{ color: "grey", marginLeft: scaleSizeW(10) }}>
              有货
            </Text>
          </RowFlexConatiner>
          <NumInput
            num={num}
            minNum={1}
            maxNum={999}
            setNum={setNum}
          ></NumInput>
        </RowFlexConatiner>
        <AddButton num={num} goodsId={selectGoodsId || goodDetail.info.id} onAddSuccess={()=>onIsVisible(false)} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: scaleSizeW(10),
    borderTopRightRadius: scaleSizeW(10),
    padding: scaleSizeW(10),
  },
  specVal: {
    height: scaleSizeW(35),
    marginTop: scaleSizeW(10),
    padding: scaleSizeW(5),
    borderRadius: scaleSizeW(10),
    justifyContent: "flex-start",
    width: 80,
  },
  buttonGroup: {
    width: "auto",
    marginTop: scaleSizeW(10),
  },
});
