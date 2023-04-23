import { StyleSheet, View, Pressable, Image } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text } from "../../../components/typography/text.component";
import { excersisesDB, exerciseNames } from "./fitness";

const AllFitnessCards = () => {
  const navigation = useNavigation();
  return (
    <View>
      {exerciseNames.map(({ name, url }, idx) => (
        <Pressable
          onPress={() =>
            navigation.navigate("AllWorkout", {
              title: name,
            })
          }
          style={{ alignItems: "center", justifyContent: "center", margin: 10 }}
          key={idx}
        >
          <Image
            style={{
              width: "95%",
              height: 140,
              borderRadius: 7,
            }}
            source={{ uri: url }}
          />
          <Text
            variant="title"
            color="inverse"
            style={{
              position: "absolute",
              left: 20,
              top: 20,
              textTransform: "uppercase",
            }}
          >
            {name}
          </Text>
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "white",
              bottom: 15,
              left: 20,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "white",
              bottom: 15,
              left: 35,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
          <MaterialCommunityIcons
            style={{
              position: "absolute",
              color: "white",
              bottom: 15,
              left: 50,
            }}
            name="lightning-bolt"
            size={24}
            color="black"
          />
        </Pressable>
      ))}
    </View>
  );
};

export default AllFitnessCards;
