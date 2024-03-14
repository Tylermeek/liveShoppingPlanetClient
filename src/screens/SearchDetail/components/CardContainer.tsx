import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/base";
import { Card, Icon, Skeleton, Text } from "@rneui/themed";
import { delAllSearchHistory } from "axios/api/search";
import { uniqueId } from "lodash-es";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Views } from "types/config";
import { isEmptyArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export enum SearchCardType {
  SearchRecommend = "searchRecommend",
  SearchHistory = "searchHistory",
}

export enum SearchCardIcon {
  Delete = "delete",
  Refresh = "refresh",
}

export interface CardContainerProps {
  title: string;
  type: SearchCardType;
  loading: boolean;
  contentList: string[];
  refreshList: Function;
}

const CardContainer: React.FC<CardContainerProps> = ({
  title,
  type,
  loading = false,
  contentList = [],
  refreshList,
}) => {
  const navigation = useNavigation();

  const handlePress = (content: string) => {
    // getSearchResultList
    navigation.navigate(Views.SearchResultList, {
      content,
    });
  };

  const handlePressIcon = () => {
    switch (type) {
      case SearchCardType.SearchHistory:
        handleDelAll();
        break;
      case SearchCardType.SearchRecommend:
        refreshList();
      default:
        break;
    }
  };

  const handleDelAll = () => {
    console.log("handleDelAll");
    delAllSearchHistory()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <Card containerStyle={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={{ fontSize: scaleSizeH(11), flex: 1 }}>{title}</Text>
          <Button color={"transparent"} size="sm" onPress={handlePressIcon}>
            <Icon
              name={
                type === SearchCardType.SearchHistory
                  ? SearchCardIcon.Delete
                  : SearchCardIcon.Refresh
              }
              size={15}
              color={"grey"}
            />
          </Button>
        </View>
        <Card.Divider></Card.Divider>
        <View style={styles.listConatiner}>
          {loading ? (
            <>
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </>
          ) : (
            <>
              {contentList.map((content) => {
                return (
                  <Button
                    key={uniqueId()}
                    color={"#f9fafb"}
                    radius="md"
                    containerStyle={styles.button}
                    buttonStyle={{ padding: scaleSizeH(2) }}
                    titleStyle={{
                      color: "grey",
                      fontSize: scaleSizeH(10),
                    }}
                    onPress={() => handlePress(content)}
                  >
                    {content.length <= 5
                      ? content
                      : `${content.slice(0, 6)}...`}
                  </Button>
                );
              })}
            </>
          )}
        </View>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: scaleSizeH(120),
    width: "95%",
    marginTop: 0,
    marginLeft: scaleSizeW(10),
    borderColor: "transparent",
    shadowColor: "transparent",
  },
  titleWrapper: {
    height: scaleSizeH(30),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  listConatiner: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    marginBottom: scaleSizeH(6),
    marginRight: scaleSizeW(6),
  },
});

export default CardContainer;
