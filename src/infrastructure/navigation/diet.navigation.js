import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { colors } from "../theme/colors";
import { CalculateHomeScreen } from "../../features/calculate/screens/CalculateHomeScreen";
import BasicInformationScreen from "../../features/settings/screens/basic-information.screen";
import { AllActivities } from "../../features/calculate/screens/AllActivities";
import { DietHomeScreen } from "../../features/diet/screens/DietHomeScreen";
import { CalorieFinderScreen } from "../../features/diet/screens/CalorieFinderScreen";
import { MealPlanScreen } from "../../features/diet/screens/MealPlanScreen";
import { ViewRecipeScreen } from "../../features/diet/screens/ViewRecipeScreen";

const DietStack = createStackNavigator();

export const DietNavigator = () => {
  return (
    <DietStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: colors.brand.primary,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
      initialRouteName="DietHomeScreen"
    >
      <DietStack.Screen
        name="DietHomeScreen"
        options={{
          headerShown: false,
        }}
        component={DietHomeScreen}
      />
      <DietStack.Screen
        name="CalorieFinderScreen"
        options={{
          headerShown: false,
        }}
        component={CalorieFinderScreen}
      />
      <DietStack.Screen
        name="MealPlanScreen"
        options={{
          headerShown: false,
        }}
        component={MealPlanScreen}
      />

      <DietStack.Screen
        name="ViewRecipeScreen"
        options={{
          headerShown: false,
        }}
        component={ViewRecipeScreen}
      />
    </DietStack.Navigator>
  );
};
