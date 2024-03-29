import { useNavigation } from "@react-navigation/native";
import { ListItem } from "@rneui/themed";
import { uniqueId } from "lodash-es";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Views } from "types/navigation";
import { SuggestionsList } from "types/search";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export type SuggestionListProps = {
  suggestionList?: SuggestionsList;
};

const SuggestionList: React.FC<SuggestionListProps> = ({
  suggestionList = [],
}) => {
  const navigation = useNavigation();

  const handlePress = (content: string) => {
    navigation.navigate(Views.SearchResultList, {
      content,
    });
  };
  return (
    !isEmptyArr(suggestionList) && (
      <View style={{ height: scaleSizeW(30), width: "100%" }}>
        {suggestionList.map((suggestion) => {
          return (
            <ListItem bottomDivider key={uniqueId(suggestion)}>
              <ListItem.Content>
                <TouchableOpacity onPress={() => handlePress(suggestion)}>
                  <ListItem.Title style={{ fontSize: scaleSizeH(12) }}>
                    {suggestion}
                  </ListItem.Title>
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </View>
    )
  );
};

const styles = StyleSheet.create({});

export default SuggestionList;
