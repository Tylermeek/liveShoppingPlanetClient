import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Icon, Text } from "@rneui/themed";
import { IGoodDetail } from "types/goods";
import { StyleSheet, TouchableOpacity } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import RowFlexConatiner from "components/RowFlexContainer";
import BuyBottomSheet from "./BuyBottomSheet";
import BuyAddBottomSheet from "./BuyAddBottomSheet";

export default function SpecCart({ goodDetail }: { goodDetail: IGoodDetail }) {
  const [isVisible, setIsVisible] = useState(false);
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
      <BuyAddBottomSheet
        isVisible={isVisible}
        onIsVisible={setIsVisible}
        goodDetail={goodDetail}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: scaleSizeW(40),
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
