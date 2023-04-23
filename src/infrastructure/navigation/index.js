import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";

import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { SafeArea } from "../../components/utility/safe-area.component";

export const Navigation = () => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      <SafeArea>
        {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
      </SafeArea>
    </NavigationContainer>
  );
};
