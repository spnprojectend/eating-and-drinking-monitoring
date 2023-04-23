import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";

import { Text } from "../../../components/typography/text.component";
import {
  ContainerBox,
  DataBox,
  FooterContainer,
  MainContainer,
  Meetup,
  TitleBox,
} from "../components/home.styles";
import { SvgXml } from "react-native-svg";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { Banner } from "react-native-paper";
import { Image } from "react-native";
import calculate from "../../../../assets/img/calculate";
import {
  calculateBMI,
  calculateBodyFatPercentage,
  calculateDailyCalories,
  getWeightStatus,
} from "../../../components/reusable/helperFun";
import { AuthButton } from "../../settings/components/settings.styles";
import { Spacer } from "../../../components/spacer/spacer.component";
import { TouchableOpacity } from "react-native";

export const CalculateHomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { age, weight, height, gender } = user;
  const isEnabled = !!age && !!height && !!weight;

  if (isEnabled) {
    return (
      <>
        <Text
          variant="caption"
          style={{
            fontSize: 14,
            textAlign: "center",
            marginTop: 10,
          }}
        >
          💡 Calculated based on your profile information
        </Text>
        <MainContainer>
          <TouchableOpacity
          // onPress={() => navigation.navigate("AllActivities")}
          >
            <ContainerBox
              style={{
                backgroundColor: "#fff",
              }}
            >
              <TitleBox
                style={{
                  width: "100%",
                }}
              >
                <Image
                  source={require("../../../../assets/img/activity.gif")}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
                <Text
                  variant="title"
                  style={{
                    fontWeight: 800,
                  }}
                >
                  To recalculate, update your info.
                </Text>
              </TitleBox>
            </ContainerBox>
          </TouchableOpacity>

          <ContainerBox
            style={{
              backgroundColor: "#222831",
            }}
          >
            <TitleBox>
              <Image
                source={{
                  uri: "https://img.icons8.com/fluency/96/null/bmi.png",
                }}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <Text
                color="inverse"
                variant="title"
                style={{
                  fontWeight: 800,
                }}
              >
                BMI
              </Text>
            </TitleBox>
            <DataBox>
              <Text color="inverse" variant="titleLg">
                {calculateBMI(height, weight)}
              </Text>
              {getWeightStatus(calculateBMI(height, weight))}
            </DataBox>
          </ContainerBox>
          <ContainerBox
            style={{
              backgroundColor: "#00ADB5",
            }}
          >
            <TitleBox>
              <Image
                source={{
                  uri: "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/null/external-body-fat-fitness-and-healthy-living-flaticons-lineal-color-flat-icons-6.png",
                }}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <Text
                color="inverse"
                variant="title"
                style={{
                  fontWeight: 800,
                }}
              >
                Body Fat %
              </Text>
            </TitleBox>
            <DataBox>
              <Text color="inverse" variant="titleLg">
                {calculateBodyFatPercentage({
                  age,
                  gender,
                  weight,
                  height,
                  neck: "50",
                  waist: "96",
                  hip: "92",
                })}{" "}
                %
              </Text>
            </DataBox>
          </ContainerBox>
          <ContainerBox
            style={{
              backgroundColor: "#FF2E63",
            }}
          >
            <TitleBox>
              <Image
                source={{
                  uri: "https://img.icons8.com/external-becris-lineal-color-becris/64/null/external-calories-ketogenic-diet-becris-lineal-color-becris.png",
                }}
                style={{
                  width: 60,
                  height: 60,
                }}
              />
              <Text
                color="inverse"
                variant="title"
                style={{
                  fontWeight: 800,
                }}
              >
                Daily Calories
              </Text>
            </TitleBox>
            <DataBox>
              <Text color="inverse" variant="titleLg">
                {calculateDailyCalories(
                  age,
                  gender,
                  weight,
                  height,
                  "moderatelyActive"
                )}
              </Text>
              <Text color="inverse" variant="title">
                Calories
              </Text>
            </DataBox>
          </ContainerBox>
        </MainContainer>
        <Spacer size="small">
          <AuthButton
            icon="pen"
            mode="contained"
            buttonColor="dark"
            style={{
              margin: 20,
            }}
            onPress={() => navigation.navigate("BasicInfo")}
          >
            Update Info
          </AuthButton>
        </Spacer>
      </>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Banner
          visible={true}
          actions={[
            {
              label: "Add Details",
              onPress: () => {
                navigation.navigate("BasicInfo");
              },
            },
          ]}
          icon={({ size }) => (
            <Image
              source={{
                uri: "https://img.icons8.com/clouds/100/null/information.png",
              }}
              style={{
                width: size * 1.2,
                height: size * 1.2,
              }}
            />
          )}
        >
          We will need your basic information to calculate your profile.
        </Banner>
      </View>
    );
  }
};
