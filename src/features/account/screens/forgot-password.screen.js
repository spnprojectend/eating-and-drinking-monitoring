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
import { Spacer } from "../../../components/spacer/spacer.component";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SvgXml } from "react-native-svg";
import { Text } from "../../../components/typography/text.component";
import password from "../../../../assets/password";

export const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const { error, isLoading, onPasswordChange, info, reset } = useContext(
    AuthenticationContext
  );
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
  return (
    <AccountBackground>
      <AccountContainer>
        <HeadingWrapper>
          <Text
            variant="h3"
            style={{
              fontWeight: "bold",
              textAlign: "left",
            }}
          >
            Forgot Password?
          </Text>

          <ImageWrapper>
            <SvgXml
              key={`logo`}
              xml={password}
              width={150}
              height={150}
              style={{
                transform: [{ translateX: 50 }],
              }}
            />
          </ImageWrapper>
        </HeadingWrapper>
        <Spacer size="large">
          <Text variant="body">
            Don't worry, we'll send you an email with a link to reset your
            password.
          </Text>
        </Spacer>
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
          left={<TextInput.Icon icon={"at"} />}
          style={{
            backgroundColor: "transparent",
          }}
        />
        {error && (
          <ErrorContainer size="large">
            <Text variant="error" color="error">
              {error}
            </Text>
          </ErrorContainer>
        )}
        {info && (
          <ErrorContainer size="large">
            <Text variant="hint">{info}</Text>
          </ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <AuthButton
              icon="lock-reset"
              mode="contained"
              onPress={() => {
                if (email) {
                  onPasswordChange(email);
                }
              }}
              buttonColor="dark"
            >
              Reset Password
            </AuthButton>
          ) : (
            <ActivityIndicator animating={true} color={"#64b5f6"} />
          )}
        </Spacer>
      </AccountContainer>
      {info && (
        <Spacer size="large">
          <AuthButton
            style={{
              borderRadius: 0,
            }}
            mode="contained"
            onPress={() => {
              reset();
              navigation.goBack();
            }}
          >
            Back to Login
          </AuthButton>
        </Spacer>
      )}
    </AccountBackground>
  );
};
