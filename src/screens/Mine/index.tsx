import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CompositeTabScreenParamList } from "navigators/RootStack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "./components/Header";
import MainEntry from "./components/MainEntry";
import MyOrder from "./components/MyOrder";
import Wallet from "./components/Wallet";
import LivingFollowingList from "screens/Live/LivingFollowingList";
import RecommendProductList from "components/RecommendList";
import { handleMomentumScrollEnd } from "utlis/method";
import { scaleSizeH, scaleSizeW } from "utlis/scaleSize";
import { LinearGradient } from "expo-linear-gradient";

type MineProps = CompositeTabScreenParamList<"Mine">;

const Mine: React.FC<MineProps> = ({ navigation }) => {
  const [isEndReached, setIsEndReached] = useState<boolean>(false);

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={(event) =>
            handleMomentumScrollEnd(event, isEndReached, setIsEndReached)
          }
          scrollEventThrottle={50}
        >
          <Header />
          <View
            style={{
              backgroundColor: "#ebebeb",
              flex: 1,
              borderTopLeftRadius: scaleSizeW(15),
              borderTopRightRadius: scaleSizeW(15),
            }}
          >
            <LinearGradient
              colors={["#fff7f7", "#ebebeb"]}
              style={[styles.linearGradient, { borderRadius: scaleSizeW(10) }]}
            ></LinearGradient>
            <MainEntry />
            <MyOrder />
            <Wallet />
            {/* <View style={{ marginTop: scaleSizeW(10) }}>
                        <LivingFollowingList />
                    </View> */}
            <RecommendProductList isEndReached />
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    height: scaleSizeH(260),
    borderTopLeftRadius: scaleSizeW(15),
    borderTopRightRadius: scaleSizeW(15),
    width: "100%",
    position: "absolute",
    top: 0,
    right: 0,
  },
});

export default Mine;
