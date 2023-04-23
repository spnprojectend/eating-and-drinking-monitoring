import React, { useContext, useState } from "react";

import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../../account/components/account.styles";
import { ActivityIndicator } from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SettingsContainer } from "../components/settings.styles";

export const EditAccount = ({ navigation }) => {
  const { user, error, info, isLoading } = useContext(AuthenticationContext);
  const [name, setName] = useState(user.name || "");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <SettingsContainer>
      <Spacer size="large">
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
          mode="outlined"
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
          mode="outlined"
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
          <AuthButton icon="lock" mode="contained" buttonColor="dark">
            Update Password
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} color={"#000"} />
        )}
      </Spacer>
    </SettingsContainer>
  );
};
