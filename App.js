import { StatusBar } from "expo-status-bar";
import RootStack from "navigators/RootStack";
import { StyleSheet, View } from "react-native";

export default function App() {
  return (
    <>
      <StatusBar
        animated={true}
        hidden={false}
        translucent={true}
        backgroundColor="transparent"
        barStyle={"default"}
        showHideTransition={"fade"}
        networkActivityIndicatorVisible={true}
      />
      <RootStack></RootStack>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
