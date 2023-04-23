import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components/native";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";

import { ActivityIndicator } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import {
  AuthButton,
  AuthInput,
  ErrorContainer,
  SettingsContainer,
} from "../components/settings.styles";

export const EditPassword = ({ navigation }) => {
  const { error, isLoading, changePassword, info, reset } = useContext(
    AuthenticationContext
  );
  const [oldPassword, setOldPassword] = useState("");

  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  useEffect(() => {
    reset();
  }, []);

  return (
    <SettingsContainer>
      <Spacer size="large">
        <AuthInput
          label="Old Password"
          value={oldPassword}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setOldPassword(p)}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </Spacer>
      <Spacer size="large">
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </Spacer>
      <Spacer size="large">
        <AuthInput
          label="Repeat Password"
          value={repeatedPassword}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setRepeatedPassword(p)}
          style={{
            backgroundColor: "transparent",
          }}
        />
      </Spacer>
      {info && (
        <ErrorContainer size="large">
          <Text variant="hint">{info}</Text>
        </ErrorContainer>
      )}
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
            icon="lock"
            mode="contained"
            disabled={password.length === 0 || repeatedPassword.length === 0}
            onPress={() => {
              changePassword(oldPassword, password, repeatedPassword);
            }}
          >
            Update Password
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={"#000"} />
        )}
      </Spacer>
    </SettingsContainer>
  );
};
