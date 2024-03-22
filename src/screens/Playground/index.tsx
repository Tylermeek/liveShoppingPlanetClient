import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";
import LottieView from "lottie-react-native";
import { BottomSheet, Button, Image, Text } from "@rneui/themed";
import RowFlexConatiner from "components/RowFlexContainer";

const animationList = [
  {
    name: "love",
    source: require("../../../assets/animation/love.json"),
  },
  {
    name: "crown",
    source: require("../../../assets/animation/crown.json"),
  },
  {
    name: "firework",
    source: require("../../../assets/animation/firework.json"),
  },
  {
    name: "spaceShip",
    source: require("../../../assets/animation/spaceShip.json"),
  },
];

export default function Playground() {
  const animationRef = useRef<LottieView>(null);
  const [showGif, setshowGif] = useState(false);
  const [showGifSource, setshowGifSource] = useState();
  const [openList, setOpenList] = useState(false);

  useEffect(() => {
    if (showGif) {
      animationRef.current?.play();
      // fix me 关闭动画时机问题
      setTimeout(() => {
        animationRef.current?.pause();
        setshowGif(false);
      }, 3500);
    }
  }, [showGif]);
  function handleOpenGiftList(): void {
    throw new Error("Function not implemented.");
  }



  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Button
          title={"送礼物"}
          onPress={() => setOpenList(true)}
          buttonStyle={{ margin: scaleSizeW(100) }}
        />
        <BottomSheet
          modalProps={{}}
          isVisible={openList}
          onBackdropPress={() => setOpenList(false)}
        >
          <RowFlexConatiner
            containerStyle={{
              justifyContent: "space-around",
              backgroundColor: "grey",
            }}
          >
            {animationList.map((animation) => (
              <View
                key={animation.name}
                style={{
                  borderRadius: scaleSizeW(15),
                  overflow: "hidden",
                  // height: scaleSizeW(100),
                  // width: scaleSizeW(80),
                  margin: StatusBar.currentHeight,
                }}
              >
                <Image
                  style={{
                    height: scaleSizeW(70),
                    width: scaleSizeW(70),
                    borderRadius: scaleSizeW(15),
                  }}
                  source={require("../../../assets/animationCover/love.png")}
                />
                <Text h2 style={{ textAlign: "center" }}>
                  {animation.name}
                </Text>
                <Button
                  title="赠送"
                  radius="md"
                  onPress={() => {
                    setshowGifSource(animation.source);
                    setshowGif(true);
                  }}
                  buttonStyle={{
                    padding: scaleSizeW(2),
                  }}
                  containerStyle={{
                    margin: scaleSizeW(5),
                  }}
                  titleStyle={{
                    fontSize: scaleSizeW(11),
                  }}
                />
              </View>
            ))}
          </RowFlexConatiner>
        </BottomSheet>
        {showGif && (
          <LottieView
            ref={animationRef}
            source={showGifSource}
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              position: "absolute",
            }}
            loop
            // autoPlay
          />
        )}
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    margin: scaleSizeW(10),
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: scaleSizeW(15),
    paddingLeft: scaleSizeW(10),
    paddingVertical: scaleSizeW(10),
    borderBottomWidth: 1,
    borderRadius: 10,
  },
});
