import { View, ScrollView } from "react-native";
import React, { useContext, useLayoutEffect, useState } from "react";
import { TransitionPresets } from "@react-navigation/stack";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthButton, AuthInput } from "../../account/components/account.styles";
import { TextInput } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";
import dayjs from "dayjs";
import { Text } from "../../../components/typography/text.component";
import { saveFoods } from "../../../services/authentication/authentication.service";
import { v4 as uuidv4 } from "uuid";

const SingleFoodScreen = ({ navigation }) => {
  const [time, setTime] = useState(null);
  const [showTime, setShowTime] = useState(false);

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShowTime(false);
    setTime(currentDate);
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      ...TransitionPresets.ModalSlideFromBottomIOS,
    });
  }, []);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);
  const [meal, setMeal] = useState("");
  const [name, setName] = useState("");
  const [carbs, setCarbs] = useState("");
  const [cal, setCal] = useState("");
  const [fat, setFat] = useState("");
  const [proteins, setProteins] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const id = generateUniqueId();
    setLoading(true);
    await saveFoods({
      id,
      time,
      meal,
      name,
      carbs,
      cal,
      fat,
      proteins,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 16 }}>
        <Spacer size="medium">
          <Text
            variant="title"
            style={{
              textAlign: "center",
            }}
          >
            <Text
              variant="caption"
              style={{
                fontSize: 16,
              }}
            >
              {/* On {dayjs().format("dddd, MMMM D, YYYY")} */}
              For Today
            </Text>
          </Text>
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Food Name"
            value={name}
            type="text"
            onChangeText={(u) => setName(u)}
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Spacer>
        <Spacer size="medium">
          <DropDown
            label={"Category"}
            mode={"outlined"}
            visible={showMultiSelectDropDown}
            showDropDown={() => setShowMultiSelectDropDown(true)}
            onDismiss={() => setShowMultiSelectDropDown(false)}
            value={meal}
            setValue={setMeal}
            list={mealList}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Calories(K.cal)"
            value={cal}
            keyboardType="numeric"
            onChangeText={(u) => setCal(u)}
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Carbohydrates"
            value={carbs}
            keyboardType="numeric"
            onChangeText={(u) => setCarbs(u)}
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Fat"
            value={fat}
            keyboardType="numeric"
            onChangeText={(u) => setFat(u)}
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Proteins"
            value={proteins}
            keyboardType="numeric"
            onChangeText={(u) => setProteins(u)}
            style={{
              backgroundColor: "#fff",
            }}
          />
        </Spacer>

        <Spacer size="medium">
          <AuthInput
            label="Choose Time"
            value={time && dayjs(time).format("hh:mm A")}
            disabled
            mode="outlined"
            left={
              <TextInput.Icon
                icon="calendar"
                onPress={() => {
                  setShowTime(true);
                }}
              />
            }
          />
        </Spacer>
        <Spacer size="large" />
        <AuthButton
          mode="contained"
          loading={loading}
          onPress={handleSubmit}
          disabled={
            !meal || !time || !name || !cal || !carbs || !fat || !proteins
          }
        >
          Add Food
        </AuthButton>

        {showTime && (
          <DateTimePicker
            testID="timePicker"
            value={new Date()}
            mode="time"
            onChange={onTimeChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default SingleFoodScreen;
const mealList = [
  {
    label: "Breakfast",
    value: "Breakfast",
  },
  {
    label: "Lunch",
    value: "Lunch",
  },
  {
    label: "Snacks",
    value: "Snacks",
  },
  {
    label: "Dinner",
    value: "Dinner",
  },
];
export function generateUniqueId() {
  // Get the current timestamp in milliseconds
  const timestamp = new Date().getTime();

  // Generate a random number between 0 and 1
  const random = Math.floor(Math.random() * 1000);

  // Combine the timestamp and random number to create a unique ID
  const id = `${timestamp}-${random}`;

  return id;
}
