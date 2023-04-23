import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { EditPassword } from "../../features/settings/screens/change-password.screen";
import { EditProflile } from "../../features/settings/screens/edit-profile.screen";

const Tab = createMaterialTopTabNavigator();

const EditAccountNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="EditProfile"
      screenOptions={{
        // tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        // tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="EditProfile"
        component={EditProflile}
        options={{ tabBarLabel: "Edit Profile" }}
      />
      <Tab.Screen
        name="EditPassword"
        component={EditPassword}
        options={{ tabBarLabel: "Change Password" }}
      />
    </Tab.Navigator>
  );
};
export default EditAccountNavigator;
