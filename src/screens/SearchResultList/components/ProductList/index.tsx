import { Button, Tab, TabView, Text } from "@rneui/themed";
import WaterFall from "components/WaterFall";
import ProductCard from "screens/SearchResultList/components/ProductList/ProductCard";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { LiveInfo, ProductInfo } from "types/info";
import { handleMomentumScrollEnd, randomArr } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { IGoodInfo } from "types/goods";
import { ISearchGood, SortTypes } from "types/search";
import { getSearchProductList } from "axios/api/search";
export interface ProductListProps {
  searchContent: string;
}

const ProductList: React.FC<ProductListProps> = ({ searchContent }) => {
  const [list, setList] = useState<ISearchGood[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);
  const [activeSubTab, setSubActiveTab] = useState<number>(0);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.Default);
  const [isEndReached, setIsEndReached] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

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
      page: newPageNo,
    });
    setList(list.concat(res.data.list));
    setLoadingMore(false);
  };

  const handleinitList = async () => {
    setRefreshing(true);
    const res = await getSearchProductList({
      keyword: searchContent,
      sort: sortType,
      page: pageNo,
    });
    setRefreshing(false);
    setList(res.data.list);
  };

  useEffect(() => {
    handleinitList();
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
            setSubActiveTab(tabIndex);
            setSortType(sortTabOpts[tabIndex].value);
            // todo 更新搜索
            handleinitList();
          }}
          style={styles.tabConatiner}
          disableIndicator={true}
          scrollable={false}
        >
          {sortTabOpts.map((tabItem) => {
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
              />
            );
          })}
        </Tab>
        {refreshing ? (
          <Button type="clear" loading size="sm" />
        ) : (
          <WaterFall
            list={list}
            isEndReached={isEndReached}
            loadingMore={loadingMore}
            ContentCard={ProductCard}
            updateListCb={setList}
            getMoreList={handleGetMoreList}
          />
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderTopLeftRadius: scaleSizeW(10),
    borderTopRightRadius: scaleSizeW(10),
  },
  tabConatiner: {
    height: scaleSizeH(25),
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
