import { StatusBar } from "expo-status-bar";
import RootStack from "navigators/RootStack";
import { StyleSheet, View } from "react-native";
import { createTheme, ThemeProvider } from "@rneui/themed";

export default function App() {
  const theme = createTheme({
    lightColors: {
      primary: "#E36235",
      secondary: "#EC9A86",
      background: "#ffffff",
      success: "#22c55e",
      warning: "#F3C262",
      searchBg: "#f9fafb",
      divider: "#f7f7f7",
    },
    darkColors: {
      primary: "blue",
    },
    components: {
      Button: {
        raised: true,
      },
    },
  });
  return (
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
