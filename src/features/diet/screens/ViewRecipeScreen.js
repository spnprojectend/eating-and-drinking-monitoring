import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  ActivityIndicator,
  Avatar,
  Button,
  Card,
  DataTable,
  ProgressBar,
  Searchbar,
} from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import axios from "axios";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components";
import { FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Linking } from "react-native";

export const AllMedications = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
const LeftContent = (props) => (
  <Avatar.Icon
    {...props}
    icon="food"
    color="#fff"
    style={{
      backgroundColor: "#000",
    }}
  />
);

export const ViewRecipeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [meal, setMeal] = useState(null);
  const route = useRoute();

  const id = route.params.id;

  useEffect(() => {
    handleChange(id);
  }, []);

  const handleChange = async (search) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${search}`
      );

      setMeal(data?.meals[0] || null);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!!meal)
    return (
      <View
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Ionicons
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            size={28}
            color="black"
          />
          <Text
            variant="title"
            style={{
              marginLeft: 30,
            }}
          >
            {meal.strMeal}
          </Text>
        </View>

        <Spacer size={"medium"} />
        <Spacer position="bottom" size="large">
          <Card>
            <Card.Title
              title={meal.strMeal}
              subtitle={meal.strCategory}
              left={LeftContent}
            />
            <Card.Cover source={{ uri: meal.strMealThumb }} />

            <View
              style={{
                padding: 15,
                height: "56%",
              }}
            >
              <Text variant="title">Instructions:</Text>
              <Spacer size="medium" />
              <ScrollView>
                <Text
                  variant="caption"
                  style={{
                    textAlign: "justify",
                  }}
                >
                  {meal.strInstructions}
                </Text>
              </ScrollView>

              <Card.Actions>
                <Button
                  onPress={() => {
                    Linking.openURL(meal.strYoutube);
                  }}
                  textColor="#fff"
                  style={{
                    borderRadius: 6,
                    backgroundColor: "#000",
                  }}
                >
                  Watch Video
                </Button>
              </Card.Actions>
            </View>
          </Card>
        </Spacer>
      </View>
    );

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};
