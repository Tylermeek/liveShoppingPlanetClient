import { StatusBar } from "expo-status-bar";
import RootStack from "navigators/RootStack";
import { StyleSheet, View } from "react-native";
import { createTheme, ThemeProvider } from "@rneui/themed";
import { Provider } from "react-redux";
import { store } from "store";
import { scaleSizeW } from "utlis/scaleSize";

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
      Text: {
        h1Style: {
          fontSize: scaleSizeW(18),
          fontWeight: "900"
        },
        h2Style: {
          fontSize: scaleSizeW(15),
          fontWeight: "700"
        },
        h3Style: {
          fontSize: scaleSizeW(13),
          fontWeight: "600"
        },
        h4Style: {
          fontSize: scaleSizeW(12),
          fontWeight: "400"
        }
      }
    },
  });
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
