import { useNavigation } from "@react-navigation/native";
import { Icon, Image, Text } from "@rneui/base";
import { Skeleton } from "@rneui/themed";
import { useRequest } from "ahooks";
import { getFirstcategoryList } from "axios/api/catalog";
import { chunk, uniqueId } from "lodash-es";
import React from "react";
import {
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { ICategory } from "types/catalog";
import { Views } from "types/navigation";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";

export interface FuncInfo {
  name: string;
  title: string;
  icon: string;
}

export type FuncList = FuncInfo[];

const FuncBlock: React.FC = () => {
  // TODO 功能列表配置化
  const { data, loading } = useRequest(getFirstcategoryList);
  const { navigate } = useNavigation();
  const handlePress = (category: ICategory) => {
    console.log(`todo jump to ${category.name}`);
    navigate(Views.CatalogDetail, { index: 0, rootId: category.id });
  };

  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <>
            {chunk(new Array(8).fill(1), 4).map((subList, index) => (
              <View
                key={index}
                style={{ display: "flex", flexDirection: "row" }}
              >
                {subList.map((val, subIndex) => (
                  <Skeleton
                    key={subIndex}
                    width={50}
                    height={50}
                    style={{
                      marginVertical: scaleSizeW(10),
                      marginHorizontal: scaleSizeW(20),
                    }}
                  />
                ))}
              </View>
            ))}
          </>
        ) : (
          chunk(data?.data.slice(0, 8), 4).map((subList) => {
            return (
              <View
                key={uniqueId()}
                style={{ display: "flex", flexDirection: "row" }}
              >
                {subList.map((category) => {
                  return (
                    <TouchableOpacity
                      key={uniqueId()}
                      style={styles.funcContainer}
                      onPress={() => handlePress(category)}
                    >
                      <Image
                        style={{
                          width: scaleSizeH(30),
                          height: scaleSizeH(30),
                          borderRadius: scaleSizeW(5),
                        }}
                        source={{ uri: category.picUrl }}
                      ></Image>
                      <Text
                        style={{
                          fontSize: scaleSizeW(9),
                          lineHeight: scaleSizeH(24),
                          textAlign: "center",
                        }}
                      >
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })
        )}

        {}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    width: "auto",
    margin: scaleSizeH(5),
  },
  funcContainer: {
    height: scaleSizeH(64),
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FuncBlock;
