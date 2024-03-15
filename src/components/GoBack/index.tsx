import { useNavigation } from "@react-navigation/native";
import { Button, Icon } from "@rneui/themed";
import React from "react";
import { StyleSheet } from "react-native";

const GoBack: React.FC = () => {
  const { goBack, canGoBack } = useNavigation();

  return (
    <>
      <Button onPress={() => canGoBack() && goBack()} type="clear">
        <Icon name="arrow-back"></Icon>
      </Button>
    </>
  );
};

const styles = StyleSheet.create({});

export default GoBack;
