import { Text } from "@rneui/themed";
import RowFlexConatiner from "components/RowFlexContainer";
import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import { scaleSizeW } from "utlis/scaleSize";

interface LiveTitleProps {
  liveTitle: string;
  liveUser: string;
}
const LiveTitle: React.FC<LiveTitleProps> = ({ liveTitle, liveUser }) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <RowFlexConatiner
          containerStyle={{
            backgroundColor: "white",
            padding: scaleSizeW(3),
            borderRadius: scaleSizeW(25),
            width: scaleSizeW(100),
            alignItems:"center"
          }}
        >
          <LottieView
            source={require("../../../../../assets/animation/spectrogram.json")}
            style={{
              width: scaleSizeW(35),
              height: scaleSizeW(20),
              //   backgroundColor: "white",
            }}
            speed={1.5}
            resizeMode="cover"
            autoPlay={true}
            loop={true}
          />
          <Text h2 style={{ color: "#E36235" }}>
            直播中
          </Text>
        </RowFlexConatiner>
        <Text h1 style={{ color: "white" }}>
          @{liveUser}
        </Text>
        <Text h2 style={{ color: "white" }}>
          {liveTitle}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    position: "absolute",
    bottom: "5%",
    left: "5%",
  },
});

export default LiveTitle;
