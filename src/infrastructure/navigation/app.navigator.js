import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import { HomeNavigator } from "./home.navigator";
import { SettingsNavigator } from "./settings.navigator";

import { colors } from "../../infrastructure/theme/colors";
import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { MedicationContextProvider } from "../../services/medication/medication.context";
import { NotificationContextProvider } from "../../services/notifications/notification.context";
import { FitnessContextProvider } from "../../services/fitness/workout.context";
import { FitnessNavigator } from "./fitness.navigator";
import { CalcualteNavigator } from "./calculate.navigator";
import { DietNavigator } from "./diet.navigation";

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "md-home",
  Calculate: "md-calculator",
  Fitness: "activity",
  Diet: "fast-food",
  Settings: "md-settings",
};

export const AppNavigator = () => {
  // const { user, sendVerificationEmail } = useContext(AuthenticationContext);
  // const [visible, setVisible] = React.useState(!user.emailVerified);
  // const onDismissSnackBar = () => setVisible(false);

  return (
    <>
      <MedicationContextProvider>
        <NotificationContextProvider>
          <FitnessContextProvider>
            <Tab.Navigator
              screenOptions={({ route }) => {
                return {
                  tabBarIcon: ({ size, color }) => {
                    if (route.name === "Fitness")
                      return (
                        <Feather name="activity" size={size} color={color} />
                      );
                    else {
                      return (
                        <Ionicons
                          name={TAB_ICON[route.name]}
                          size={size}
                          color={color}
                        />
                      );
                    }
                  },

                  activeTintColor: colors.brand.primary,
                  inactiveTintColor: colors.brand.muted,
                  tabBarHideOnKeyboard: true,
                };
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Calculate"
                component={CalcualteNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Fitness"
                component={FitnessNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Diet"
                component={DietNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Settings"
                options={{
                  headerShown: false,
                }}
                component={SettingsNavigator}
              />
            </Tab.Navigator>
          </FitnessContextProvider>
        </NotificationContextProvider>
      </MedicationContextProvider>
    </>
  );
};
