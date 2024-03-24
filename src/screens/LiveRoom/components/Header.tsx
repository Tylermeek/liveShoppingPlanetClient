import { View, StatusBar, TouchableOpacity } from "react-native";
import React from "react";
import RowFlexConatiner from "components/RowFlexContainer";
import { scaleSizeW } from "utlis/scaleSize";
import { Avatar, Button, Icon, Text } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

export default function Header() {
  const { canGoBack, goBack } = useNavigation();
  function handleBack(): void {
    if (canGoBack()) {
      goBack();
    }
  }

  return (
    <RowFlexConatiner
      containerStyle={{
        paddingTop: StatusBar.currentHeight,
        justifyContent: "space-between",
        width: "100%",
        position: "absolute",
        top: 0,
      }}
    >
      <RowFlexConatiner
        containerStyle={{
          backgroundColor: "rgba(224, 224, 224, 0.3)",
          padding: scaleSizeW(5),
          marginLeft: scaleSizeW(10),
          borderRadius: scaleSizeW(20),
        }}
      >
        <Avatar
          source={{ uri: "https://source.unsplash.com/400x400/" }}
          rounded
          size={50}
        />
        <View style={{ marginLeft: scaleSizeW(10) }}>
          <Text h1>直播间test</Text>
          <Text h3>观看人数{999}</Text>
        </View>
        <Button
          title="关注"
          size="sm"
          radius="md"
          titleStyle={{
            textAlign: "center",
            fontSize: scaleSizeW(16),
            lineHeight: scaleSizeW(16),
          }}
          containerStyle={{ marginLeft: scaleSizeW(10) }}
        />
      </RowFlexConatiner>
      <TouchableOpacity
        style={{
          backgroundColor: "rgba(224, 224, 224, 0.3)",
          padding: scaleSizeW(5),
          borderRadius: scaleSizeW(20),
        }}
        onPress={handleBack}
      >
        <Icon name="close" color="white" />
      </TouchableOpacity>
    </RowFlexConatiner>
  );
}
