import { Button, Icon, Tab, TabView, Text } from "@rneui/themed";
import WaterFall from "components/WaterFall";
import ProductCard from "screens/SearchResultList/components/ProductList/ProductCard";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LiveInfo, ProductInfo } from "types/info";
import {
  handleMomentumScrollEnd,
  randomArr,
  splitAndInterleave,
} from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { IGoodInfo } from "types/goods";
import { ISearchGood, SortOrder, SortTypes } from "types/search";
import { getSearchProductList } from "axios/api/search";
import { chunk } from "lodash-es";
import { useRoute } from "@react-navigation/native";
import { RootRouteType, Views } from "types/navigation";
export interface ProductListProps {
  // searchContent: string;
}

const ProductList: React.FC<ProductListProps> = () => {
  const [coloumLists, setColoumLists] = useState<ISearchGood[][]>([[], []]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [activeSubTab, setSubActiveTab] = useState<number>(0);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.Default);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [isAsc, setisAsc] = useState(true);
  const route = useRoute<any>();
  const searchContent = route.params.searchContent;
  console.log(searchContent);

  const sortTabOpts = [
    {
      title: "综合",
      value: SortTypes.Default,
    },
    {
      title: "价格",
      value: SortTypes.RetailPrice,
    },
    {
      title: "品名",
      value: SortTypes.Name,
    },
  ];

  const handleGetMoreList = async () => {
    const newPageNo = pageNo + 1;
    setPageNo(newPageNo);
    setLoadingMore(true);
    const res = await getSearchProductList({
      keyword: searchContent,
      sort: sortType,
      order: isAsc ? "asc" : "desc",
      page: newPageNo,
    });
    const tempList = chunk(res.data.list, Math.floor(res.data.list.length / 2));
    setColoumLists((preLists) => [
      [...preLists[0], ...tempList[0]],
      [...preLists[1], ...tempList[1]],
    ]);
    setLoadingMore(false);
  };

  const handleinitList = async (
    sort: SortTypes,
    page: number,
    order: SortOrder
  ) => {
    setRefreshing(true);
    console.log({
      sort,
      page,
      order,
    });
    const res = await getSearchProductList({
      keyword: searchContent,
      sort,
      page,
      order,
    });
    setRefreshing(false);
    setColoumLists(splitAndInterleave(res.data.list));
  };

  useEffect(() => {
    handleinitList(sortType, pageNo, "asc");
  }, []);
  return (
    <>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        onScroll={(event) =>
          handleMomentumScrollEnd(event, isEndReached, setIsEndReached)
        }
        scrollEventThrottle={50}
      >
        <Tab
          value={activeSubTab}
          onChange={(tabIndex) => {
            console.log(tabIndex);
            if (tabIndex === activeSubTab && tabIndex === 0) return;
            if (tabIndex === activeSubTab) {
              setisAsc(!isAsc);
              handleinitList(sortType, 1, !isAsc ? "asc" : "desc");
              return;
            }
            setSubActiveTab(tabIndex);
            setSortType(sortTabOpts[tabIndex].value);
            setPageNo(1);
            setisAsc(true);
            // todo 更新搜索
            handleinitList(sortType, 1, "asc");
          }}
          style={styles.tabConatiner}
          disableIndicator={true}
          scrollable={false}
        >
          {sortTabOpts.map((tabItem, index) => {
            return (
              <Tab.Item
                key={tabItem.value}
                title={tabItem.title}
                titleStyle={(active) => {
                  return {
                    color: active ? "#E36235" : "grey",
                    ...styles.TabItemTitle,
                  };
                }}
                containerStyle={styles.TabItemConatiner}
                buttonStyle={styles.TabItemButton}
                iconRight
                icon={
                  activeSubTab === index &&
                  index !== 0 && (
                    <View>
                      <Icon
                        name="keyboard-arrow-up"
                        size={15}
                        color={isAsc ? "#E36235" : "grey"}
                      />
                      <Icon
                        name="keyboard-arrow-down"
                        size={15}
                        color={!isAsc ? "#E36235" : "grey"}
                      />
                    </View>
                  )
                }
              />
            );
          })}
        </Tab>
        {refreshing ? (
          <Button type="clear" loading size="sm" />
        ) : (
          <WaterFall
            coloumLists={coloumLists}
            isEndReached={isEndReached}
            loadingMore={loadingMore}
            ContentCard={ProductCard}
            updateListCb={setColoumLists}
            getMoreList={handleGetMoreList}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderTopLeftRadius: scaleSizeW(10),
    borderTopRightRadius: scaleSizeW(10),
  },
  tabConatiner: {
    height: scaleSizeW(30),
    backgroundColor: "white",
    alignItems: "center",
  },
  TabItemConatiner: {
    height: scaleSizeH(25),
  },
  TabItemTitle: {
    lineHeight: scaleSizeH(25),
    fontSize: scaleSizeH(10),
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  TabItemButton: {
    padding: 0,
    paddingHorizontal: 0,
  },
  tabViewContainer: {
    width: "100%",
    backgroundColor: "white",
    flex: 1,
  },
});

export default ProductList;
