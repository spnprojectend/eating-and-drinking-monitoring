import React from "react";
import Logo from "../../../../assets/logo.js";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  ImageWrapper,
} from "../components/account.styles";
import { SvgXml } from "react-native-svg";
import welcome from "../../../../assets/welcome.js";
import { Text } from "../../../components/typography/text.component.js";
import { colors } from "../../../infrastructure/theme/colors.js";
import { View } from "react-native";

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <ImageWrapper>
        <SvgXml key={`logo`} xml={welcome} width={300} height={300} />
      </ImageWrapper>
      <Spacer size="large" />
      <Spacer size="large" />
      <Spacer size="large" />
      <Spacer size="large" />
      <View>
        <Text
          variant="h2"
          color="main"
          style={{
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Healthie
          <View
            style={{
              transform: [{ translate: [10, 10] }],
            }}
          >
            <SvgXml key={`logo`} xml={Logo} width={50} height={50} />
          </View>
        </Text>
        <Spacer size="large" />

        <Text
          variant="label"
          style={{
            // fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Because you’ll be healthier.
        </Text>
      </View>
      <Spacer size="large" />

      <AccountContainer>
        <AuthButton
          icon="account-plus"
          mode="contained"
          onPress={() => navigation.navigate("Register")}
          buttonColor="dark"
        >
          Create an account
        </AuthButton>
        <Spacer size="large">
          <AuthButton
            icon="login"
            mode="contained"
            onPress={() => navigation.navigate("Login")}
          >
            Login with Email
          </AuthButton>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
