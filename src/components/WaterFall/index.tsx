import React, { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { isEmptyArr, randomArr } from "utlis/method";
import { chunk, uniqueId } from "lodash-es";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LiveInfo, ProductInfo } from "types/info";
import { Button, Text } from "@rneui/themed";
import { IResponse } from "axios/config";

export interface ContentCardProps {
  contentInfo: any;
}

export interface WaterFallProps {
  isEndReached: boolean;
  loadingMore: boolean;
  coloumLists: any[][];
  ContentCard: React.FC<ContentCardProps>;
  columLen?: number;
  updateListCb: (list: any[]) => void;
  getMoreList: () => Promise<void>;
}

const WaterFall: React.FC<WaterFallProps> = ({
  isEndReached,
  loadingMore,
  coloumLists,
  ContentCard,
  getMoreList,
}) => {
  
  useEffect(() => {
    if (isEndReached) {
      console.log("isEndReached");
      getMoreList();
    }
  }, [isEndReached]);

  return (
    <>
      <View style={styles.container}>
        {!isEmptyArr(coloumLists) &&
          coloumLists.map((subList, columnIndex) => {
            return (
              <View
                style={[
                  styles.column,
                  { marginLeft: columnIndex === 1 ? 0 : scaleSizeW(10) },
                ]}
                key={columnIndex}
              >
                {subList.map((content, index) => {
                  return (
                    content && (
                      <ContentCard
                        key={index}
                        contentInfo={content}
                      ></ContentCard>
                    )
                  );
                })}
              </View>
            );
          })}
      </View>
      <View style={styles.endLine}>
        {loadingMore ? (
          <Button type="clear" loading size="sm" />
        ) : (
          <Text style={{ fontSize: scaleSizeH(14) }}>—— 到底啦 ——</Text>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "stretch",
  },
  column: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    margin: scaleSizeW(10),
  },
  endLine: {
    height: scaleSizeH(30),
    marginBottom: scaleSizeW(10),
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WaterFall;
