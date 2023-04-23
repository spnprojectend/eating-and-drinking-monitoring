import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, View, Image } from "react-native";
import { IconButton, MD3Colors } from "react-native-paper";

import { Text } from "../../../components/typography/text.component";
import {
  HeaderContainer,
  MainContainer,
  ContainerBox,
  TitleBox,
  DataBox,
  CircularView,
} from "../components/home.styles";
import { SvgXml } from "react-native-svg";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import home from "../../../../assets/home";
import remainder from "../../../../assets/img/remainder";
import notes from "../../../../assets/img/notes";
import CircularProgress from "react-native-circular-progress-indicator";
import { calculateDailyCalories } from "../../../components/reusable/helperFun";
import { MedicationContext } from "../../../services/medication/medication.context";
import StepCounter from "../../../components/reusable/StepCounter";
import { Platform } from "react-native";
import dayjs from "dayjs";
var isToday = require("dayjs/plugin/isToday");
dayjs.extend(isToday);

export const HomeScreen = ({ navigation }) => {
  const { user } = useContext(AuthenticationContext);
  const { allFoods, saveData, getData } = useContext(MedicationContext);

  const { foods } =
    allFoods.length > 0 ? allFoods[allFoods.length - 1] : { foods: [] };
  console.log(JSON.stringify(foods));

  const count =
    foods.length > 0 &&
    dayjs(
      foods[0].time.seconds * 1000 + foods[0].time.nanoseconds / 1000000
    ).isToday()
      ? foods.reduce((accumulator, current) => accumulator + +current["cal"], 0)
      : 0;

  const { age, weight, height, gender } = user;
  const isEnabled = !!age && !!height && !!weight;

  const [value, setValue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await getData(user.id + "-water");
    setValue(+data);
  };
  const handleMinus = () => {
    setValue((val) => val - 1);
    saveData(user.id + "-water", Number(value - 1).toString());
  };
  const handlePlus = async () => {
    setValue((val) => val + 1);
    saveData(user.id + "-water", Number(value + 1).toString());
  };

  return (
    <ScrollView>
      <HeaderContainer
        style={{
          backgroundColor: "#536DFE",
        }}
      >
        {/* <SvgXml
          key={`star-`}
          xml={home}
          width={600}
          height={600}
          style={{
            position: "absolute",
            right: 0,
          }}
        ></SvgXml> */}
        <View
          style={{
            transform: [
              {
                translate: [10, -20],
              },
            ],
          }}
        >
          <Text color="inverse" variant="titleLg">
            Welcome,
          </Text>
          <Text color="inverse" variant="h5">
            {user?.name}
          </Text>
        </View>

        <Image
          source={require("../../../../assets/img/avatar.png")}
          style={{
            position: "absolute",
            width: 150,
            height: 150,
            bottom: -50,
            right: 50,
            resizeMode: "contain",
          }}
        />
      </HeaderContainer>
      <MainContainer>
        {Platform.OS === "ios" ? (
          <ContainerBox
            style={{
              backgroundColor: "#fff",
              height: 150,
            }}
          >
            <StepCounter />
          </ContainerBox>
        ) : null}

        <TouchableOpacity onPress={() => navigation.navigate("Food")}>
          <ContainerBox
            style={{
              backgroundColor: "#fff",
            }}
          >
            <CircularView>
              <CircularProgress
                value={count}
                radius={60}
                duration={500}
                activeStrokeColor="#FE6244"
                inActiveStrokeColor="#eee"
                maxValue={
                  isEnabled
                    ? Number(
                        calculateDailyCalories(
                          age,
                          gender,
                          weight,
                          height,
                          "moderatelyActive"
                        )
                      )
                    : 2200
                }
              />
              <Image
                source={{
                  uri: "https://img.icons8.com/bubbles/100/null/tableware.png",
                }}
                style={{
                  position: "absolute",
                  width: 80,
                  height: 80,
                }}
              />
            </CircularView>

            <DataBox>
              {count > 0 ? (
                <>
                  <Text
                    variant="caption"
                    style={{
                      fontSize: 18,
                    }}
                  >
                    {count} of{" "}
                    {Number(
                      calculateDailyCalories(
                        age,
                        gender,
                        weight,
                        height,
                        "moderatelyActive"
                      )
                    )}
                  </Text>
                  <Text
                    variant="caption"
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Cal Eaten
                  </Text>
                </>
              ) : (
                <>
                  <Text
                    variant="caption"
                    style={{
                      fontSize: 18,
                    }}
                  >
                    Eat upto{" "}
                    {isEnabled
                      ? Number(
                          calculateDailyCalories(
                            age,
                            gender,
                            weight,
                            height,
                            "moderatelyActive"
                          )
                        )
                      : 2200}
                    <Text
                      variant="caption"
                      style={{
                        fontSize: 12,
                      }}
                    >
                      {" "}
                      cal
                    </Text>
                  </Text>
                </>
              )}
            </DataBox>
            <IconButton
              icon="plus-circle"
              iconColor={"#FE6244"}
              size={34}
              onPress={() => navigation.navigate("Food")}
            />
          </ContainerBox>
        </TouchableOpacity>
        <ContainerBox
          style={{
            backgroundColor: "#fff",
            height: 150,
          }}
        >
          <IconButton
            icon="minus-circle"
            iconColor={"#1CA3EC"}
            size={34}
            disabled={value === 0}
            onPress={handleMinus}
          />
          <CircularView>
            <CircularProgress
              value={value}
              radius={60}
              duration={500}
              activeStrokeColor="#1CA3EC"
              inActiveStrokeColor="#eee"
              maxValue={12}
              title={""}
            />
            <Image
              source={{
                uri: "https://img.icons8.com/external-flaticons-flat-flat-icons/64/null/external-water-morning-flaticons-flat-flat-icons-2.png",
              }}
              style={{
                position: "absolute",
                width: 35,
                height: 35,
              }}
            />

            <Text
              variant="caption"
              style={{
                position: "absolute",
                bottom: -30,
                fontSize: 16,
              }}
            >
              {value} of 9
            </Text>
          </CircularView>
          <IconButton
            icon="plus-circle"
            iconColor={"#1CA3EC"}
            size={34}
            disabled={value === 9}
            onPress={handlePlus}
          />
        </ContainerBox>
        <ContainerBox
          style={{
            backgroundColor: "#fff",
          }}
        >
          <TitleBox>
            <Image
              source={{
                uri: "https://img.icons8.com/external-justicon-lineal-color-justicon/64/null/external-weight-scale-fitness-gym-justicon-lineal-color-justicon.png",
              }}
              style={{
                width: 45,
                height: 45,
              }}
            />
          </TitleBox>
          <DataBox>
            <Text variant="titleLg">
              {user?.weight || 0}

              <Text variant="caption"> kg</Text>
            </Text>

            <Text variant="caption">Weight Tracker</Text>
          </DataBox>
          <IconButton
            icon="plus-circle"
            iconColor={MD3Colors.error50}
            size={34}
            onPress={() => navigation.navigate("BasicInfoC")}
          />
        </ContainerBox>
        <TouchableOpacity onPress={() => navigation.navigate("Notes")}>
          <ContainerBox
            style={{
              backgroundColor: "#222831",
            }}
          >
            <TitleBox>
              <SvgXml
                key={`star-`}
                xml={notes}
                width={100}
                height={100}
              ></SvgXml>
            </TitleBox>
            <DataBox>
              <Text
                variant="caption"
                color="inverse"
                style={{
                  fontSize: 15,
                }}
              >
                Pending Tasks
              </Text>
            </DataBox>
          </ContainerBox>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Remainder")}>
          <ContainerBox
            style={{
              backgroundColor: "#222831",
            }}
          >
            <TitleBox>
              <SvgXml
                key={`star-`}
                xml={remainder}
                width={100}
                height={100}
              ></SvgXml>
            </TitleBox>
            <DataBox>
              <Text
                variant="caption"
                color="inverse"
                style={{
                  fontSize: 15,
                }}
              >
                Medicine Remainder
              </Text>
            </DataBox>
          </ContainerBox>
        </TouchableOpacity>
      </MainContainer>
    </ScrollView>
  );
};
