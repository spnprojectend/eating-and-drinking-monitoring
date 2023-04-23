import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components/native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";

import {
  useFonts as useRoboto,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto";
import { useFonts as useLato, Lato_400Regular } from "@expo-google-fonts/lato";

import { theme } from "./src/infrastructure/theme";
import { Navigation } from "./src/infrastructure/navigation";

import { AuthenticationContextProvider } from "./src/services/authentication/authentication.context";
import { colors } from "./src/infrastructure/theme/colors";
import * as Notifications from "expo-notifications";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Setting a timer"]);

const papertheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.brand.primary,
  },
};
export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
  const [robotoLoaded] = useRoboto({
    Roboto_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!robotoLoaded || !latoLoaded) {
    return null;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <PaperProvider theme={papertheme}>
          <AuthenticationContextProvider>
            <Navigation />
          </AuthenticationContextProvider>
        </PaperProvider>
      </ThemeProvider>
      <ExpoStatusBar style="light" backgroundColor={colors.brand.primary} />
    </>
  );
}
