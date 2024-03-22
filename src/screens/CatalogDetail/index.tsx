import React, { useEffect, useState } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Tab } from "@rneui/themed";
import { useRoute } from "@react-navigation/native";
import { RootRouteType, Views } from "types/navigation";
import { useRequest } from "ahooks";
import { getSecondCategoryList } from "axios/api/catalog";
import { getGoodsList } from "axios/api/goods";
import CircleLoading from "components/CircleLoading";
import GoodCard from "./components/GoodCard";
import { isEmpty } from "lodash-es";
import RowFlexConatiner from "components/RowFlexContainer";
import GoBack from "components/GoBack";
import { scaleSizeW } from "utlis/scaleSize";

export default function CatalogDetail() {
  const route = useRoute<RootRouteType<Views.PlayGround>>();
  const index = route.params?.index!;
  console.log(index);
  const [activeTab, setactiveTab] = useState(index || 0);
  const rootId = route.params?.rootId!;
  console.log("rootId",rootId);
  
  const { data: secCatelist } = useRequest(getSecondCategoryList, {
    defaultParams: [rootId],
  });

  const {
    data: goodsList,
    loading,
    run,
  } = useRequest(getGoodsList, {
    refreshDeps: [activeTab],
    manual: true,
  });

  useEffect(() => {
    console.log(secCatelist?.data);
    if (!isEmpty(secCatelist?.data)) {
      run({ categoryId: secCatelist?.data[activeTab || index]?.id });
    }
    // console.log(goodsList);
  }, [secCatelist]);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <RowFlexConatiner
            containerStyle={{
              backgroundColor: "white",
              padding: scaleSizeW(10),
              paddingTop: StatusBar.currentHeight,
            }}
          >
            <GoBack />
            <Tab
              value={activeTab}
              onChange={(index) => {
                setactiveTab(index);
                run({ categoryId: secCatelist?.data[index]?.id });
              }}
              dense
              scrollable
              style={{
                marginLeft: scaleSizeW(20),
              }}
              titleStyle={(active) => ({
                color: active ? "#E36235" : "grey",
              })}
            >
              {!isEmpty(secCatelist?.data) &&
                secCatelist?.data.map((cate) => (
                  <Tab.Item key={cate.id}>{cate.name}</Tab.Item>
                ))}
            </Tab>
          </RowFlexConatiner>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            {!loading && (
              <>
                {!isEmpty(goodsList?.data.list) &&
                  goodsList?.data.list.map((good) => (
                    <GoodCard key={good.id} good={good} />
                  ))}
              </>
            )}
          </ScrollView>
          {loading && <CircleLoading />}
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({});
