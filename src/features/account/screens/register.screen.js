import React, { useState, useContext, useEffect } from "react";

import { ActivityIndicator, TextInput } from "react-native-paper";

import {
  AuthButton,
  AuthInput,
  ErrorContainer,
  HeadingWrapper,
  ImageWrapper,
  RegisterBackground,
  RegisterContainer,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SvgXml } from "react-native-svg";
import signup from "../../../../assets/signup";

export const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");
  const [showPassword, setshowPassword] = useState(true);
  const [showRepeatedPassword, setShowRepeatedPassword] = useState(true);
  const { onRegister, isLoading, error, reset } = useContext(
    AuthenticationContext
  );

  useEffect(() => {
    reset();
  }, []);

  const checkSignup = () => {
    if (!!name && !!password && !!email) {
      return false;
    }
    return true;
  };
  return (
    <RegisterBackground>
      <RegisterContainer>
        <HeadingWrapper>
          <Text
            variant="h3"
            style={{
              fontWeight: "bold",
            }}
          >
            Sign up
          </Text>
          <ImageWrapper>
            <SvgXml key={`logo`} xml={signup} width={150} height={150} />
          </ImageWrapper>
        </HeadingWrapper>
        <Spacer size="large" />
        <AuthInput
          label="Name"
          value={name}
          style={{
            backgroundColor: "transparent",
          }}
          left={<TextInput.Icon icon={"account"} />}
          textContentType="name"
          onChangeText={(u) => setName(u)}
        />
        <Spacer size="large">
          <AuthInput
            label="Email"
            value={email}
            textContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(u) => setEmail(u)}
            style={{
              backgroundColor: "transparent",
            }}
            left={<TextInput.Icon icon={"at"} />}
          />
        </Spacer>
        <Spacer size="large">
          <AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry={showPassword}
            autoCapitalize="none"
            onChangeText={(p) => setPassword(p)}
            style={{
              backgroundColor: "transparent",
            }}
            left={<TextInput.Icon icon={"lock"} />}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye" : "eye-off"}
                onPress={() => {
                  setshowPassword((prev) => !prev);
                }}
              />
            }
          />
        </Spacer>
        {/* <Spacer size="large">
          <AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry={showRepeatedPassword}
            autoCapitalize="none"
            onChangeText={(p) => setRepeatedPassword(p)}
            style={{
              backgroundColor: "transparent",
            }}
            left={<TextInput.Icon icon={"lock"} />}
            right={
              <TextInput.Icon
                icon={showRepeatedPassword ? "eye" : "eye-off"}
                onPress={() => {
                  setShowRepeatedPassword((prev) => !prev);
                }}
              />
            }
          />
        </Spacer> */}
        {error && (
          <ErrorContainer size="large">
            <Text variant="error" color="error">
              {error}
            </Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="account-plus"
              mode="contained"
              buttonColor={checkSignup() ? "" : "dark"}
              onPress={() => onRegister(email, password, name)}
              disabled={checkSignup()}
            >
              Signup
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={"#000"} />
          )}
        </Spacer>
        <Spacer size="large">
          <Text
            onPress={() => {
              navigation.navigate("Login");
            }}
            style={{
              textDecorationLine: "underline",
            }}
          >
            Have an account?
          </Text>
        </Spacer>
      </RegisterContainer>
    </RegisterBackground>
  );
};
