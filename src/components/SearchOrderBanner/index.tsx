import React, { useState } from "react";
import { Icon } from "@rneui/base";
import GoBack from "components/GoBack";
import SearchBanner from "components/SearchBanner";
import { useAppDispatch } from "store/hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootRouteType, Views } from "types/navigation";
import { fliterOrderlist } from "slice/order";

export default function SearchOrderBanner() {
  const [searchOrder, setSearchOrder] = useState("");
  const dispatch = useAppDispatch();
  const route = useRoute();
  const { navigate } = useNavigation();
  const handlePressSearch = () => {
    console.log("test", searchOrder);
    dispatch(fliterOrderlist(searchOrder));
    if (route.name !== Views.SearchResultList) {
      navigate(Views.SearchOrderList);
    }
  };
  return (
    <SearchBanner
      LeftIcon={GoBack}
      RightIcon={() => <Icon name="more-horiz" />}
      searchProps={{
        initContent: searchOrder,
        placeholder: "搜索订单",
        editable: true,
        updateSearchCb: (val) => setSearchOrder(val),
        handlePressSearch,
      }}
    />
  );
}
