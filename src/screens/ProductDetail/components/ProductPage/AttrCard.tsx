import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Button,
  BottomSheet,
  ListItem,
  Divider,
  Icon,
  Text,
} from "@rneui/themed";
import { IAttributeInfo } from "types/goods";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import RowFlexConatiner from "components/RowFlexContainer";

export default function AttrCard({
  attributeList,
}: {
  attributeList: IAttributeInfo[];
}) {
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
          <Text h4>商品属性</Text>
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
        {attributeList.map((attr, i) => (
          <ListItem key={i} bottomDivider>
            <Icon name="chevron-right" size={20} />
            <ListItem.Content>
              <ListItem.Title>{attr.attribute}</ListItem.Title>
              <ListItem.Subtitle>{attr.value}</ListItem.Subtitle>
              <Divider />
            </ListItem.Content>
          </ListItem>
        ))}
        <Button
          containerStyle={{
            padding: scaleSizeW(10),
          }}
          buttonStyle={{ borderRadius: scaleSizeW(10) }}
          onPress={() => setIsVisible(false)}
        >
          完成
        </Button>
      </BottomSheet>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: scaleSizeW(40),
    marginTop: scaleSizeH(10),
  },
});
