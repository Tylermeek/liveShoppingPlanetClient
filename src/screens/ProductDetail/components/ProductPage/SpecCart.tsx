import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Button,
  BottomSheet,
  ListItem,
  Divider,
  Icon,
  Text,
  Image,
} from "@rneui/themed";
import { IGoodDetail, ISpecification } from "types/goods";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import RowFlexConatiner from "components/RowFlexContainer";
import NumInput from "components/NumInput";
import BuyAddButtonGroup from "../BuyAddButtonGroup";

export default function SpecCart({ goodDetail }: { goodDetail: IGoodDetail }) {
  const [isVisible, setIsVisible] = useState(false);
  const [selectGoodsId, setSelectGoodsId] = useState<number>(
    goodDetail.info.id
  );
  const [num, setNum] = useState(1);
  return (
    <SafeAreaProvider>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsVisible(true)}
      >
        <RowFlexConatiner
          containerStyle={{
            height: "100%",
            justifyContent: "space-between",
            paddingHorizontal: scaleSizeW(10),
          }}
        >
          <Text h4>规格</Text>
          <RowFlexConatiner
            containerStyle={{
              height: "100%",
            }}
          >
            <Text h4>请选择</Text>
            <Icon name="chevron-right" size={20} />
          </RowFlexConatiner>
        </RowFlexConatiner>
      </TouchableOpacity>
      <BottomSheet
        modalProps={{}}
        isVisible={isVisible}
        containerStyle={{}}
        onBackdropPress={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={{ height: 200 }}
          onPress={() => setIsVisible(false)}
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
          <BuyAddButtonGroup
            num={num}
            goodsId={selectGoodsId || goodDetail.info.id}
            containerStyle={styles.buttonGroup}
          />
        </View>
      </BottomSheet>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: scaleSizeW(30),
    marginTop: scaleSizeH(10),
  },
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
