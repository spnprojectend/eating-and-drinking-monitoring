import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";
import AllMedicationScreen from "../../features/medication/screens/allmedications.screen";
import MyMedicationScreen from "../../features/medication/screens/medication.screen";
import SingleMedicationScreen from "../../features/medication/screens/singlemedication.screen";
import { colors } from "../theme/colors";
const Medication = createStackNavigator();

const MedicationNavigator = () => (
  <Medication.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      headerMode: "screen",
      headerStyle: {
        backgroundColor: colors.brand.primary,
      },
      headerTintColor: "white",
      headerTitleAlign: "center",
    }}
  >
    <Medication.Screen
      name="Remainders"
      component={MyMedicationScreen}
      options={{
        title: "Your Reminders",
      }}
    />

    <Medication.Screen
      name="AddRemainder"
      component={SingleMedicationScreen}
      options={{
        title: "Add New Reminder",
      }}
    />
  </Medication.Navigator>
);

export default MedicationNavigator;
