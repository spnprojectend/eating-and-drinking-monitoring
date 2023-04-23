import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { colors } from "../theme/colors";
import FitnessHomeScreen from "../../features/fitness/screens/FitnessHomeScreen";
import FitnessScreen from "../../features/fitness/screens/FitnessScreen";
import FitScreen from "../../features/fitness/screens/FitScreen";
import RestScreen from "../../features/fitness/screens/RestScreen";
import SearchWorkoutsScreen from "../../features/fitness/screens/SearchWorkoutsScreen";
import AllFitnessScreen from "../../features/fitness/screens/AllFitnessScreen";

const FitnessStack = createStackNavigator();

export const FitnessNavigator = () => {
  return (
    <FitnessStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: colors.brand.primary,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
      initialRouteName="FitnessHome"
    >
      <FitnessStack.Screen
        name="FitnessHome"
        options={{
          headerShown: false,
        }}
        component={FitnessHomeScreen}
      />

      <FitnessStack.Screen
        name="FindWorkout"
        component={SearchWorkoutsScreen}
        options={{
          headerShown: false,
        }}
      />
      <FitnessStack.Screen
        name="Workout"
        component={FitnessScreen}
        options={{
          headerShown: false,
        }}
      />
      <FitnessStack.Screen
        name="AllWorkout"
        component={AllFitnessScreen}
        options={{
          headerShown: false,
        }}
      />
      <FitnessStack.Screen
        name="Fit"
        component={FitScreen}
        options={{
          headerShown: false,
        }}
      />
      <FitnessStack.Screen
        name="Rest"
        component={RestScreen}
        options={{
          headerShown: false,
        }}
      />
    </FitnessStack.Navigator>
  );
};
