import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { Text } from "../../../components/typography/text.component";
import {
  ContainerBox,
  DataBox,
  MainContainer,
  TitleBox,
} from "../components/home.styles";

import { Image } from "react-native";
import {
  calculateBMI,
  calculateBodyFatPercentage,
  calculateDailyCalories,
  getWeightStatus,
} from "../../../components/reusable/helperFun";
import { AuthButton } from "../../settings/components/settings.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";
import calculate from "../../../../assets/img/calculate";
import { SvgXml } from "react-native-svg";
import diet from "../../../../assets/img/diet";

export const DietHomeScreen = ({ navigation }) => {
  return (
    <>
      <View
        style={{
          padding: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SvgXml key={`logo`} xml={diet} width={200} height={200} />
      </View>
      <Text
        variant="caption"
        style={{
          fontSize: 15,
          textAlign: "center",
        }}
      >
        💡 Discover more about your daily diet .
      </Text>
      <MainContainer>
        <TouchableOpacity
          onPress={() => navigation.navigate("CalorieFinderScreen")}
        >
          <ContainerBox
            style={{
              backgroundColor: "#222831",
            }}
          >
            <TitleBox
              style={{
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/external-becris-lineal-color-becris/64/null/external-calories-ketogenic-diet-becris-lineal-color-becris-1.png",
                }}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <Text
                variant="title"
                color="inverse"
                style={{
                  fontWeight: 800,
                }}
              >
                Foodie Calorie Finder
              </Text>
            </TitleBox>
          </ContainerBox>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("MealPlanScreen")}>
          <ContainerBox
            style={{
              backgroundColor: "#3490DE",
            }}
          >
            <TitleBox
              style={{
                width: "100%",
              }}
            >
              <Image
                source={{
                  uri: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-healthy-food-vegan-and-vegetarian-flaticons-lineal-color-flat-icons-2.png",
                }}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <Text
                variant="title"
                color="inverse"
                style={{
                  fontWeight: 800,
                }}
              >
                Personalized meal plan
              </Text>
            </TitleBox>
          </ContainerBox>
        </TouchableOpacity>
      </MainContainer>
    </>
  );
};
