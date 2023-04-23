import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { HomeScreen } from "../../features/home/screens/home.screen";
import { colors } from "../theme/colors";
import MedicationNavigator from "./medication.navigator";
import NotesScreen from "../../features/notes/screens/notes.screen";
import FoodNavigator from "./food.navigator";
import BasicInformationScreen from "../../features/settings/screens/basic-information.screen";

const HomeStack = createStackNavigator();

export const HomeNavigator = () => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerMode: "screen",
        headerStyle: {
          backgroundColor: colors.brand.primary,
        },
        headerTintColor: "white",
        headerTitleAlign: "center",
      }}
      initialRouteName="HomeScreen"
    >
      <HomeStack.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
      <HomeStack.Screen
        name="Food"
        component={FoodNavigator}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="BasicInfoC"
        options={{
          headerShown: false,
        }}
        component={BasicInformationScreen}
      />
      <HomeStack.Screen
        name="Remainder"
        component={MedicationNavigator}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen
        name="Notes"
        component={NotesScreen}
        options={{
          title: "Pending Tasks",
        }}
      />
    </HomeStack.Navigator>
  );
};
