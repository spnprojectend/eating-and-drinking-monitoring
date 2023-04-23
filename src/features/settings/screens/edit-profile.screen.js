import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Text } from "../../../components/typography/text.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import {
  AuthButton,
  AuthInput,
  ErrorContainer,
} from "../../account/components/account.styles";
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Portal,
  Provider,
} from "react-native-paper";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { SettingsContainer } from "../components/settings.styles";
import { View } from "react-native";
// import Modal from "./Modal";

export const EditProflile = () => {
  const { error, isLoading, changeProfile, user, info, reset } = useContext(
    AuthenticationContext
  );
  const [name, setName] = useState(user.name || "");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const data = {
    usernme: "sumanth",
    age: 23,
    weight: 65,
    height: 179,
    gender: "male",
  };
  return (
    <>
      {[1, 2, 3, 4, 5].map((el, idx) => (
        <>
          <View
            key={idx}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 10,
              paddingVertical: 20,
            }}
          >
            <Text>Username</Text>

            <Text>{el}</Text>
          </View>
          <Divider />
        </>
      ))}
    </>
  );

  // return <Modal />;
  // return (
  //   <SettingsContainer>
  //     <Spacer size="large">
  //       <AuthInput
  //         label="User Name"
  //         value={name}
  //         textContentType="name"
  //         onChangeText={(p) => setName(p)}
  //         style={{
  //           backgroundColor: "transparent",
  //         }}
  //       />
  //     </Spacer>

  //     {/* {info && (
  //       <ErrorContainer size="large">
  //         <Text variant="hint">{info}</Text>
  //       </ErrorContainer>
  //     )}
  //     {error && (
  //       <ErrorContainer size="large">
  //         <Text variant="error" color="error">
  //           {error}
  //         </Text>
  //       </ErrorContainer>
  //     )} */}
  //     {/* <Spacer size="large">
  //       {!isLoading ? (
  //         <AuthButton
  //           icon="lock"
  //           mode="contained"
  //           disabled={checkSignup()}
  //           onPress={() => changeProfile(name)}
  //         >
  //           Update Name
  //         </AuthButton>
  //       ) : (
  //         <ActivityIndicator animating={true} color={"#000"} />
  //       )}
  //     </Spacer> */}
  //   </SettingsContainer>
  // );
};
