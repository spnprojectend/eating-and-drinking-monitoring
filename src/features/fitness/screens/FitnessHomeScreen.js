import {
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import FitnessCards from "../components/FitnessCards";
import { FitnessContext } from "../../../services/fitness/workout.context";
import { Text } from "../../../components/typography/text.component";
import { SvgXml } from "react-native-svg";
import home from "../../../../assets/home";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const FitnessHomeScreen = () => {
  const {
    minutes,

    calories,

    workout,
  } = useContext(FitnessContext);
  const navigation = useNavigation();
  return (
    <>
      <View
        style={{
          backgroundColor: "#536DFE",
          padding: 10,
          height: 200,
          width: "100%",
          marginBottom: 60,
        }}
      >
        <Text
          variant="title"
          color="inverse"
          style={{
            marginTop: 15,
          }}
        >
          Beginner Workouts
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            marginTop: 7,
            marginBottom: 6,
          }}
        >
          <View>
            <Text
              variant="h5"
              color="inverse"
              style={{
                textAlign: "center",
              }}
            >
              {workout}
            </Text>
            <Text color="inverse" variant="label" style={{ marginTop: 6 }}>
              WORKOUTS
            </Text>
          </View>

          <View>
            <Text
              variant="h5"
              color="inverse"
              style={{
                textAlign: "center",
              }}
            >
              {Number(calories).toFixed(2)}
            </Text>
            <Text color="inverse" variant="label" style={{ marginTop: 6 }}>
              KCAL
            </Text>
          </View>

          <View>
            <Text
              variant="h5"
              color="inverse"
              style={{
                textAlign: "center",
              }}
            >
              {minutes}
            </Text>
            <Text color="inverse" variant="label" style={{ marginTop: 6 }}>
              MINS
            </Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate("FindWorkout")}
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <Image
            style={{
              width: "90%",
              height: 120,
              marginTop: 10,
              borderRadius: 7,
            }}
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrEM-6gDUO7g1cdrNhBaqk_0nwxy6ILlIqsQ&usqp=CAU",
            }}
          />
          <Text
            variant="title"
            color="inverse"
            style={{
              position: "absolute",
              left: "18%",
              bottom: 45,
              textTransform: "uppercase",
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            Advanced Workouts
          </Text>
        </Pressable>
      </View>
      <ScrollView>
        <FitnessCards />
      </ScrollView>
    </>
  );
};

export default FitnessHomeScreen;
