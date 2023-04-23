import React from "react";
import { SettingsScreen } from "../../features/settings/screens/settings.screen";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import BasicInformationScreen from "../../features/settings/screens/basic-information.screen";
import { EditPassword } from "../../features/settings/screens/change-password.screen";
import { colors } from "../theme/colors";
import { Button } from "react-native-paper";

const SettingsStack = createStackNavigator();

export const SettingsNavigator = ({ route, navigation }) => {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: colors.brand.primary,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
      initialRouteName="SettingsScreen"
    >
      <SettingsStack.Screen
        name="SettingsScreen"
        options={{
          headerShown: false,
        }}
        component={SettingsScreen}
      />
      <SettingsStack.Screen
        name="BasicInformation"
        component={BasicInformationScreen}
        options={{
          title: "Basic Information",
        }}
      />
      <SettingsStack.Screen
        name="EditPassword"
        component={EditPassword}
        options={{
          title: "Edit Password",
        }}
      />
    </SettingsStack.Navigator>
  );
};
