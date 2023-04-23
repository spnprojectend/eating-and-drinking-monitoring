import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Avatar, Button, Card, DataTable, Searchbar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import axios from "axios";
import { Spacer } from "../../../components/spacer/spacer.component";
import styled from "styled-components";
import { FlatList } from "react-native";

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

export const MealPlanScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState([
    {
      idMeal: "52940",
      strMeal: "Brown Stew Chicken",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sypxpx1515365095.jpg",
    },
    {
      idMeal: "52846",
      strMeal: "Chicken & mushroom Hotpot",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/uuuspp1511297945.jpg",
    },
    {
      idMeal: "52796",
      strMeal: "Chicken Alfredo Primavera",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/syqypv1486981727.jpg",
    },
    {
      idMeal: "52934",
      strMeal: "Chicken Basquaise",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wruvqv1511880994.jpg",
    },
    {
      idMeal: "52956",
      strMeal: "Chicken Congee",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1529446352.jpg",
    },
    {
      idMeal: "52795",
      strMeal: "Chicken Handi",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg",
    },
    {
      idMeal: "52813",
      strMeal: "Kentucky Fried Chicken",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/xqusqy1487348868.jpg",
    },
    {
      idMeal: "52945",
      strMeal: "Kung Pao Chicken",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/1525872624.jpg",
    },
    {
      idMeal: "52774",
      strMeal: "Pad See Ew",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/uuuspp1468263334.jpg",
    },
    {
      idMeal: "53039",
      strMeal: "Piri-piri chicken and slaw",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/hglsbl1614346998.jpg",
    },
    {
      idMeal: "52814",
      strMeal: "Thai Green Curry",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/sstssx1487349585.jpg",
    },
  ]);

  useEffect(() => {
    // handleChange("chicken");
  }, []);

  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 700);
    };
  };

  const handleChange = async (search) => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${search}`
      );
      setItems(data?.meals || []);
      setSearchQuery(search);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const optimizedFn = useCallback(debounce(handleChange), []);
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
          Find Recipies By Ingredient
        </Text>
      </View>

      <View>
        <Searchbar
          placeholder="Search"
          onChangeText={(query) => optimizedFn(query)}
          style={{
            borderRadius: 6,
            backgroundColor: "white",
          }}
          defaultValue="chicken"
          loading={isLoading}
        />
      </View>

      <Spacer size={"large"} />
      <Text
        variant="caption"
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontSize: 14,
        }}
      >
        Showing {items?.length || 0} results for {searchQuery}
      </Text>
      <Spacer size={"medium"} />

      {items?.length > 0 ? (
        <AllMedications
          style={{
            height: "84%",
          }}
          data={items}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="large">
              <Card>
                <Card.Title title={item.strMeal} left={LeftContent} />

                <Card.Cover source={{ uri: item.strMealThumb }} />
                <Card.Actions>
                  <Button
                    onPress={() => {
                      navigation.navigate("ViewRecipeScreen", {
                        id: item.idMeal,
                      });
                    }}
                    textColor="#fff"
                    style={{
                      borderRadius: 6,
                      backgroundColor: "#000",
                    }}
                  >
                    View Recipe
                  </Button>
                </Card.Actions>
              </Card>
            </Spacer>
          )}
          keyExtractor={(item) => item.idMeal}
        />
      ) : (
        <Spacer size={"medium"}>
          <Text
            variant="caption"
            style={{
              textAlign: "center",
              fontSize: 16,
              marginTop: 40,
            }}
          >
            No Data Available...
          </Text>
        </Spacer>
      )}
    </View>
  );
};
