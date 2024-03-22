import { View, Text, ScrollView } from "react-native";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import SearchOrderBanner from "components/SearchOrderBanner";
import { useAppSelector } from "store/hooks";
import { isEmpty } from "lodash-es";
import OrderItem from "screens/Order/components/OrderItem";
import Empty from "screens/Order/components/Empty";

export default function SearchOrderList() {
  const list = useAppSelector((state) => state.order.curList);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SearchOrderBanner />
      <ScrollView style={{ flex: 1 }}>
        {!isEmpty(list) ? (
          list.map((order) => <OrderItem order={order} />)
        ) : (
          <Empty />
        )}
      </ScrollView>
    </GestureHandlerRootView>
  );
}
