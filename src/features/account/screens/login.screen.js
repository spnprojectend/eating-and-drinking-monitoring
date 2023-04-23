import React, { useState, useContext, useEffect } from "react";
import { ActivityIndicator, TextInput } from "react-native-paper";

import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  ImageWrapper,
  HeadingWrapper,
} from "../components/account.styles";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SvgXml } from "react-native-svg";
import login from "../../../../assets/login";
import { View } from "react-native";
import { TouchableOpacity } from "react-native";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setshowPassword] = useState(true);

  const { onLogin, error, isLoading, reset } = useContext(
    AuthenticationContext
  );
  useEffect(() => {
    reset();
  }, []);
  return (
    <AccountBackground>
      <AccountContainer>
        <HeadingWrapper>
          <Text
            variant="h3"
            style={{
              fontWeight: "bold",
            }}
          >
            Login
          </Text>
          <ImageWrapper>
            <SvgXml key={`logo`} xml={login} width={150} height={150} />
          </ImageWrapper>
        </HeadingWrapper>
        <Spacer size="large" />
        <AuthInput
          label="E-mail"
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
            left={<TextInput.Icon icon={"lock-outline"} />}
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
              icon="login-variant"
              mode="contained"
              onPress={() => onLogin(email, password)}
              disabled={!email.length || !password.length}
            >
              Login
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={"#64b5f6"} />
          )}
        </Spacer>

        <Spacer size="large">
          <Text
            onPress={() => {
              navigation.navigate("ForgotPassword");
            }}
            style={{
              textDecorationLine: "underline",
            }}
          >
            Forgot your Password?
          </Text>
        </Spacer>
        <Spacer size="large">
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              transform: [{ translateY: 50 }],
            }}
          >
            <Text>New to the app?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text style={{ color: "#64b5f6", fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </View>
        </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};
