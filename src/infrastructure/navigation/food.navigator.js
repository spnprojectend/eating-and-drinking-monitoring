import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import * as React from "react";
import { colors } from "../theme/colors";
import AllFoodsScreen from "../../features/home/screens/AllFoodsScreen";
import SingleFoodScreen from "../../features/home/screens/singleFood.screen";
const FoodStack = createStackNavigator();

const FoodNavigator = () => (
  <FoodStack.Navigator
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
    <FoodStack.Screen
      name="AllFoods"
      component={AllFoodsScreen}
      options={{
        title: "Food Details",
      }}
    />

    <FoodStack.Screen
      name="AddFood"
      component={SingleFoodScreen}
      options={{
        title: "Add Food",
      }}
    />
  </FoodStack.Navigator>
);

export default FoodNavigator;
