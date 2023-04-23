import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import FitnessCards from "../components/FitnessCards";
import { Text } from "../../../components/typography/text.component";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AllFitnessCards from "../components/AllFitnessCards";

const SearchWorkoutsScreen = () => {
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          backgroundColor: "#536DFE",
          padding: 10,
          height: 70,
          width: "100%",
        }}
      >
        <Ionicons
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", top: 20, left: 20, zIndex: 999 }}
          name="arrow-back-outline"
          size={28}
          color="white"
        />
        <Text
          variant="title"
          color="inverse"
          style={{
            marginTop: 10,
            textAlign: "center",
          }}
        >
          Advanced Workouts
        </Text>
      </View>
      <ScrollView>
        <AllFitnessCards />
      </ScrollView>
    </>
  );
};

export default SearchWorkoutsScreen;
const styles = StyleSheet.create({});
