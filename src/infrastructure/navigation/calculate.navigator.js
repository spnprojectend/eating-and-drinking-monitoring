import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { colors } from "../theme/colors";
import { CalculateHomeScreen } from "../../features/calculate/screens/CalculateHomeScreen";
import BasicInformationScreen from "../../features/settings/screens/basic-information.screen";
import { AllActivities } from "../../features/calculate/screens/AllActivities";

const CalculateStack = createStackNavigator();

export const CalcualteNavigator = () => {
  return (
    <CalculateStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: colors.brand.primary,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
      initialRouteName="CalculateHomeScreen"
    >
      <CalculateStack.Screen
        name="CalculateHomeScreen"
        options={{
          headerShown: false,
        }}
        component={CalculateHomeScreen}
      />
      <CalculateStack.Screen
        name="BasicInfo"
        options={{
          headerShown: false,
        }}
        component={BasicInformationScreen}
      />
      <CalculateStack.Screen
        name="AllActivities"
        options={{
          headerShown: false,
        }}
        component={AllActivities}
      />
    </CalculateStack.Navigator>
  );
};
