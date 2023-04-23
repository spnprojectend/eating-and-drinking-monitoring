import React, { useContext, useEffect, useState } from "react";
import { Text } from "../../../components/typography/text.component";
import { Platform, View } from "react-native";
import { Button, Chip, Snackbar, TextInput } from "react-native-paper";
import { ScrollView } from "react-native";
import {
  GenderButton,
  IconView,
  InputView,
  BoxView,
  STextInput,
  AuthButton,
} from "../components/settings.styles";
import {
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { updateUser } from "../../../services/authentication/authentication.service";

const BasicInformationScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticationContext);
  const [gender, setGender] = useState(user?.gender === "male" ? true : false);
  const [name, setName] = useState(user?.name);
  const [age, setAge] = useState(user?.age);
  const [height, setHeight] = useState(user?.height);
  const [weight, setWeight] = useState(user?.weight);
  const toggleGender = () => setGender(!gender);

  const isEnabled = !!name && !!age && !!height && !!weight;

  const [visible, setVisible] = React.useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = async () => {
    if (!isEnabled) {
      setVisible(true);
    } else {
      await updateUser({
        uid: user.id,
        name,
        age,
        weight,
        height,
        gender: gender ? "male" : "female",
      });
      setUser((state) => {
        return {
          ...state,
          name,
          age,
          weight,
          height,
          gender: gender ? "male" : "female",
        };
      });
      navigation.goBack();
    }
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <BoxView>
          <IconView>
            <FontAwesome name="user" size={24} color="black" />
          </IconView>
          <InputView>
            <STextInput
              label="Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </InputView>
        </BoxView>
        <Spacer size={"large"} />

        {Platform.OS === "ios" ? (
          <BoxView>
            <IconView>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={24}
                color="red"
              />
            </IconView>
            <InputView>
              <Button
                mode="contained"
                style={{
                  backgroundColor: gender ? "#b571ff" : "#eee",
                  color: gender ? "black" : "black",
                }}
                textColor={gender ? "#fff" : "#333"}
                onPress={() => {
                  if (!gender) {
                    toggleGender();
                  }
                }}
              >
                Male
              </Button>
              <Button
                mode="contained"
                style={{
                  backgroundColor: gender ? "#eee" : "#ec44b5",
                }}
                textColor={gender ? "#333" : "#fff"}
                onPress={() => {
                  if (gender) {
                    toggleGender();
                  }
                }}
              >
                Female
              </Button>
            </InputView>
          </BoxView>
        ) : (
          <BoxView>
            <IconView>
              <MaterialCommunityIcons
                name="gender-male-female"
                size={24}
                color="red"
              />
            </IconView>
            <InputView>
              <GenderButton
                mode="contained"
                style={{
                  backgroundColor: gender ? "#b571ff" : "#eee",
                  color: gender ? "black" : "black",
                }}
                textColor={gender ? "#fff" : "#333"}
                onPress={() => {
                  if (!gender) {
                    toggleGender();
                  }
                }}
              >
                Male
              </GenderButton>
              <GenderButton
                mode="contained"
                style={{
                  backgroundColor: gender ? "#eee" : "#ec44b5",
                }}
                textColor={gender ? "#333" : "#fff"}
                onPress={() => {
                  if (gender) {
                    toggleGender();
                  }
                }}
              >
                Female
              </GenderButton>
            </InputView>
          </BoxView>
        )}

        <Spacer size={"large"} />

        <BoxView>
          <IconView>
            <FontAwesome name="birthday-cake" size={24} color="black" />
          </IconView>
          <InputView>
            <STextInput
              label="Age"
              keyboardType="numeric"
              value={age}
              onChangeText={(text) => setAge(text)}
            />
          </InputView>
        </BoxView>
        <Spacer size={"large"} />
        <BoxView>
          <IconView>
            <FontAwesome5 name="ruler" size={24} color="black" />
          </IconView>
          <InputView>
            <STextInput
              label="Height"
              right={<TextInput.Affix text="/cm" />}
              keyboardType="numeric"
              value={height}
              onChangeText={(text) => setHeight(text)}
            />
          </InputView>
        </BoxView>

        <Spacer size={"large"} />
        <BoxView>
          <IconView>
            <FontAwesome5 name="weight" size={24} color="black" />
          </IconView>
          <InputView>
            <STextInput
              label="Current Weight"
              keyboardType="numeric"
              value={weight}
              onChangeText={(text) => setWeight(text)}
              right={<TextInput.Affix text="/kg" />}
            />
          </InputView>
        </BoxView>

        <Spacer size="xxl">
          <AuthButton icon="check" mode="contained" onPress={handleSubmit}>
            DONE
          </AuthButton>
        </Spacer>
      </View>
      <Snackbar visible={visible} onDismiss={onDismissSnackBar} duration={3000}>
        Fill all the fields
      </Snackbar>
    </>
  );
};

export default BasicInformationScreen;
