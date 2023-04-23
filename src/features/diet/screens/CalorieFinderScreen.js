import React, { useCallback, useContext, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { DataTable, Searchbar } from "react-native-paper";
import { Text } from "../../../components/typography/text.component";
import axios from "axios";
import { Spacer } from "../../../components/spacer/spacer.component";

export const CalorieFinderScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState({});

  const [items, setItems] = useState([
    {
      name: "brisket",
      calories: 289.3,
      serving_size_g: 100,
      fat_total_g: 18.3,
      fat_saturated_g: 7.3,
      protein_g: 29.1,
      sodium_mg: 47,
      potassium_mg: 172,
      cholesterol_mg: 107,
      carbohydrates_total_g: 0,
      fiber_g: 0,
      sugar_g: 0,
    },
    {
      name: "fries",
      calories: 317.7,
      serving_size_g: 100,
      fat_total_g: 14.8,
      fat_saturated_g: 2.3,
      protein_g: 3.4,
      sodium_mg: 212,
      potassium_mg: 124,
      cholesterol_mg: 0,
      carbohydrates_total_g: 41.1,
      fiber_g: 3.8,
      sugar_g: 0.3,
    },
  ]);

  useEffect(() => {
    const result = {};
    items.forEach((item) => {
      for (let key in item) {
        if (key === "name") continue;
        if (key in result) {
          result[key] += item[key];
        } else {
          result[key] = item[key];
        }
      }
    });
    setResult(result);
  }, [items]);

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
        "https://api.api-ninjas.com/v1/nutrition",
        {
          params: {
            query: search,
          },
          headers: {
            "X-Api-Key": "XIjF0HjxPNfidhGIC68/9g==b63vifrTtM4KRWbM",
          },
        }
      );
      setItems(data);
      setSearchQuery(search);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const optimizedFn = useCallback(debounce(handleChange), []);
  console.log(result);
  return (
    <View
      style={{
        padding: 20,
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
          Food Calorie Finder
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
          defaultValue="brisket and fries"
          loading={isLoading}
        />
      </View>

      <Spacer size={"medium"}>
        <Text
          variant="title"
          style={{
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {searchQuery}
        </Text>
        <Text
          variant="titleLg"
          style={{
            textAlign: "center",
            color: "#00ADB5",
          }}
        >
          {result?.calories || 0} CAL
        </Text>
      </Spacer>
      <Spacer size={"medium"}>
        <Text
          variant="caption"
          style={{
            textAlign: "center",
          }}
        >
          Serving Size per 100/Grams
        </Text>
      </Spacer>
      {items.length > 0 ? (
        <ScrollView style={{}}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title
                textStyle={{
                  fontWeight: "bold",

                  color: "#000",
                }}
              >
                Nutrition
              </DataTable.Title>
              {items.map((el, idx) => (
                <DataTable.Title
                  key={idx}
                  numeric
                  textStyle={{
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    color: "#000",
                  }}
                >
                  {el.name}
                </DataTable.Title>
              ))}
            </DataTable.Header>
            <DataTable.Row>
              <DataTable.Cell>Carbohydrates:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.carbohydrates_total_g}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>
            {result?.carbohydrates_total_g}
          </DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Cholesterol:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.cholesterol_mg}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.cholesterol_mg}</DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Saturated fat:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.fat_saturated_g}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.fat_saturated_g}</DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Total Fat:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.fat_total_g}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.fat_total_g}</DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Fiber Content:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.fiber_g}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.fiber_g}</DataTable.Cell> */}
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Potassium</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.potassium_mg}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.potassium_mg}</DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Protein:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.protein_g}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.protein_g}</DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Sodium:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.sodium_mg}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.sodium_mg}</DataTable.Cell> */}
            </DataTable.Row>
            <DataTable.Row>
              <DataTable.Cell>Sugar:</DataTable.Cell>
              {items.map((el, idx) => (
                <DataTable.Title key={idx} numeric>
                  {el.sugar_g}
                </DataTable.Title>
              ))}
              {/* <DataTable.Cell numeric>{result?.sugar_g}</DataTable.Cell> */}
            </DataTable.Row>
          </DataTable>
        </ScrollView>
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
